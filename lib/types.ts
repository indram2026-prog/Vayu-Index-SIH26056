export interface IndexPoint {
  observation_date: string;
  index_value: number;
  base_date: string;
}

export interface RouteDetail {
  route_id: string;
  weight: number;
  base_price: number | null;
  latest_price: number | null;
  price_relative: number | null;
}

export interface SourceLayerQuality {
  total_raw_records: number;
  parse_failed: number;
  null_fare_or_sold_out: number;
  statistical_anomalies_removed: number;
  usable_observations: number;
  usable_rate: number;
}

export interface DataQuality {
  imputed_via_carry_forward: number;
  imputation_rate: number;
  source_layer: SourceLayerQuality;
}

export interface IndexPayload {
  index_timeseries: IndexPoint[];
  latest_date: string;
  route_detail_latest: RouteDetail[];
  data_quality: DataQuality;
  reviewed_dates: string[]; // dates a MoSPI analyst has signed off on
  served_from: "supabase" | "sample";
}
