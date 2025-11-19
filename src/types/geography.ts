import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";

export type ProfileLayerId = "cuidadoras" | "microtrap" | "desalentados";

export const PROFILE_LAYER_LABELS: Record<ProfileLayerId, string> = {
  cuidadoras: "Cuidadoras invisibles",
  microtrap: "Comerciantes atrapados en lo micro",
  desalentados: "Emprendedores desalentados",
};

export const PROFILE_SOURCE_LABEL_TO_ID: Record<string, ProfileLayerId> = {
  Caregivers: "cuidadoras",
  "Micro-trap retailers": "microtrap",
  "Discouraged micro-entrepreneurs": "desalentados",
};

export const PROFILE_MAX_RANK = 32;

export interface ProfileMetricSnapshot {
  label: string;
  code: string;
  sharePct: number;
  shareRank: number;
  shareRankScore: number;
  count: number;
  countRank: number;
  countRankScore: number;
}

export interface InformalityFeatureProperties {
  cveEnt: string;
  stateName: string;
  wholesaleRate: number;
  retailRate: number;
  wholesaleRateDecimal: number;
  retailRateDecimal: number;
  wholesaleValue: number;
  retailValue: number;
  informalValue: number;
  povertyRate: number;
  imssGapRate: number;
  educationGapRate: number;
  profiles: Record<ProfileLayerId, ProfileMetricSnapshot>;
  derivedProfileMetrics?: Record<string, number>;
  [key: string]: any;
}

export type InformalityFeature = Feature<Polygon | MultiPolygon, InformalityFeatureProperties>;

export type InformalityFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  InformalityFeatureProperties
>;
