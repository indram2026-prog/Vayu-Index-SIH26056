import { RouteDetail } from "@/lib/types";

function fmtINR(n: number | null): string {
  if (n === null || n === undefined) return "—";
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function RouteTable({ routes }: { routes: RouteDetail[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs text-muted dark:text-muted-dark">
          <th className="py-1.5 font-medium">Route</th>
          <th className="py-1.5 text-right font-medium">Weight</th>
          <th className="py-1.5 text-right font-medium">Base fare</th>
          <th className="py-1.5 text-right font-medium">Latest fare</th>
          <th className="py-1.5 text-right font-medium">Change</th>
        </tr>
      </thead>
      <tbody className="nums">
        {routes.map((r) => {
          const rel = r.price_relative;
          const relClass = rel == null ? "" : rel >= 1 ? "text-up dark:text-up-dark" : "text-down dark:text-down-dark";
          const relText = rel == null ? "—" : `${rel >= 1 ? "+" : ""}${((rel - 1) * 100).toFixed(2)}%`;
          return (
            <tr key={r.route_id} className="border-t border-line dark:border-line-dark">
              <td className="py-1.5">{r.route_id}</td>
              <td className="py-1.5 text-right">{(r.weight * 100).toFixed(0)}%</td>
              <td className="py-1.5 text-right">{fmtINR(r.base_price)}</td>
              <td className="py-1.5 text-right">{fmtINR(r.latest_price)}</td>
              <td className={`py-1.5 text-right ${relClass}`}>{relText}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
