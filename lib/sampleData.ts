import { IndexPayload } from "./types";

// Snapshot of a real run of the etl-python pipeline (see the SIH26056 repo's
// etl-python/output/daily_index.json). Used only when SUPABASE_URL /
// SUPABASE_SERVICE_ROLE_KEY aren't set, so the app is fully functional the
// moment you clone + `npm run dev` — no backend required to see it work.
export const SAMPLE_DATA: Omit<IndexPayload, "reviewed_dates" | "served_from"> = {
  index_timeseries: [
    { observation_date: "2026-09-13", index_value: 100.0, base_date: "2026-09-13" },
    { observation_date: "2026-09-14", index_value: 100.78, base_date: "2026-09-13" },
    { observation_date: "2026-09-15", index_value: 101.44, base_date: "2026-09-13" },
    { observation_date: "2026-09-16", index_value: 101.54, base_date: "2026-09-13" },
    { observation_date: "2026-09-17", index_value: 101.82, base_date: "2026-09-13" },
    { observation_date: "2026-09-18", index_value: 101.62, base_date: "2026-09-13" },
    { observation_date: "2026-09-19", index_value: 100.86, base_date: "2026-09-13" },
    { observation_date: "2026-09-20", index_value: 100.38, base_date: "2026-09-13" },
    { observation_date: "2026-09-21", index_value: 99.47, base_date: "2026-09-13" },
    { observation_date: "2026-09-22", index_value: 99.30, base_date: "2026-09-13" },
    { observation_date: "2026-09-23", index_value: 99.09, base_date: "2026-09-13" },
    { observation_date: "2026-09-24", index_value: 98.81, base_date: "2026-09-13" },
    { observation_date: "2026-09-25", index_value: 98.73, base_date: "2026-09-13" },
    { observation_date: "2026-09-26", index_value: 99.52, base_date: "2026-09-13" },
  ],
  latest_date: "2026-09-26",
  route_detail_latest: [
    { route_id: "DEL-BOM", weight: 0.22, base_price: 5206.87, latest_price: 5149.55, price_relative: 0.989 },
    { route_id: "DEL-BLR", weight: 0.16, base_price: 5953.79, latest_price: 5923.73, price_relative: 0.995 },
    { route_id: "BOM-BLR", weight: 0.13, base_price: 4369.63, latest_price: 4361.91, price_relative: 0.9982 },
    { route_id: "DEL-HYD", weight: 0.11, base_price: 5503.99, latest_price: 5489.79, price_relative: 0.9974 },
    { route_id: "BOM-HYD", weight: 0.09, base_price: 4114.38, latest_price: 4123.02, price_relative: 1.0021 },
    { route_id: "DEL-CCU", weight: 0.08, base_price: 6278.94, latest_price: 6309.81, price_relative: 1.0049 },
    { route_id: "DEL-PNQ", weight: 0.06, base_price: 4811.67, latest_price: 4799.32, price_relative: 0.9974 },
    { route_id: "BLR-HYD", weight: 0.06, base_price: 3695.95, latest_price: 3638.57, price_relative: 0.9845 },
    { route_id: "DEL-GOI", weight: 0.05, base_price: 5438.22, latest_price: 5374.90, price_relative: 0.9884 },
    { route_id: "BOM-GOI", weight: 0.04, base_price: 3441.83, latest_price: 3448.02, price_relative: 1.0018 },
  ],
  data_quality: {
    imputed_via_carry_forward: 0,
    imputation_rate: 0.0,
    source_layer: {
      total_raw_records: 3920,
      parse_failed: 4,
      null_fare_or_sold_out: 206,
      statistical_anomalies_removed: 6,
      usable_observations: 3708,
      usable_rate: 0.9459,
    },
  },
};
