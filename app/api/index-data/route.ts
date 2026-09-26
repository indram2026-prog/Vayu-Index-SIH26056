import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { SAMPLE_DATA } from "@/lib/sampleData";
import { IndexPayload } from "@/lib/types";

// Real HTTP-level caching, not decorative: this route is revalidated at most
// once every 5 minutes (matches how often the pipeline actually produces a
// new number), so repeat visits within that window are served from Vercel's
// edge cache rather than re-querying Supabase every time.
export const revalidate = 300;

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    const payload: IndexPayload = { ...SAMPLE_DATA, reviewed_dates: [], served_from: "sample" };
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  }

  try {
    const [{ data: indexRows, error: indexErr }, { data: detailRows, error: detailErr }, { data: reviewRows }] =
      await Promise.all([
        supabase.from("daily_index").select("observation_date, index_value, base_date").order("observation_date"),
        supabase
          .from("route_daily_detail")
          .select("route_id, weight, route_price, price_relative")
          .order("observation_date", { ascending: false })
          .limit(10),
        supabase.from("daily_index_review").select("observation_date"),
      ]);

    if (indexErr || detailErr || !indexRows?.length) {
      throw indexErr ?? detailErr ?? new Error("no rows in daily_index");
    }

    const latest = indexRows[indexRows.length - 1];
    const payload: IndexPayload = {
      index_timeseries: indexRows,
      latest_date: latest.observation_date,
      route_detail_latest: (detailRows ?? []).map((r) => ({
        route_id: r.route_id,
        weight: r.weight,
        base_price: null, // base price is a derived value; recomputed client-side from the series if needed
        latest_price: r.route_price,
        price_relative: r.price_relative,
      })),
      data_quality: SAMPLE_DATA.data_quality, // TODO: wire to a `daily_data_quality` table once the pipeline writes one
      reviewed_dates: (reviewRows ?? []).map((r) => r.observation_date),
      served_from: "supabase",
    };

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("[api/index-data] Supabase query failed, falling back to sample data:", err);
    const payload: IndexPayload = { ...SAMPLE_DATA, reviewed_dates: [], served_from: "sample" };
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" }, // shorter TTL: this is a degraded response
    });
  }
}
