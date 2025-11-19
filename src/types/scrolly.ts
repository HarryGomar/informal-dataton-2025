export type MapTheme = "default" | "impact" | "density" | "profiles";

export interface MapState {
  center: [number, number];
  zoom: number;
  theme?: MapTheme;
}

export type StepId =
  | "context"
  | "problem"
  | "size"
  | "history"
  | "method"
  | "results"
  | "profiles"
  | "densityMap"
  | "clusterMap"
  | "interventionMap";

export interface StepConfig {
  id: StepId;
  title: string;
  body: string;
  mapState: MapState;
}
