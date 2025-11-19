import { useEffect, useState } from "react";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type {
  InformalityFeatureCollection,
  InformalityFeatureProperties,
  ProfileLayerId,
  ProfileMetricSnapshot,
} from "../types/geography";
import {
  PROFILE_LAYER_LABELS,
  PROFILE_MAX_RANK,
  PROFILE_SOURCE_LABEL_TO_ID,
} from "../types/geography";

const geojsonUrl = new URL("../assets/data/informal_data.geojson", import.meta.url).href;

const PROFILE_DEFAULTS: Record<ProfileLayerId, ProfileMetricSnapshot> = {
  cuidadoras: createEmptyProfileSnapshot(PROFILE_LAYER_LABELS.cuidadoras),
  microtrap: createEmptyProfileSnapshot(PROFILE_LAYER_LABELS.microtrap),
  desalentados: createEmptyProfileSnapshot(PROFILE_LAYER_LABELS.desalentados),
};

let cache: InformalityFeatureCollection | null = null;
let pending: Promise<InformalityFeatureCollection> | null = null;

export function useInformalityGeoData() {
  const [data, setData] = useState<InformalityFeatureCollection | null>(cache);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cache) {
      return;
    }

    let mounted = true;
    if (!pending) {
      pending = loadInformalityGeojson();
    }

    pending
      .then((collection) => {
        if (!mounted) {
          return;
        }
        cache = collection;
        pending = null;
        setData(collection);
      })
      .catch((err) => {
        if (!mounted) {
          return;
        }
        pending = null;
        setError(err instanceof Error ? err : new Error("No se pudo cargar el mapa"));
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading: !data && !error, error };
}

export async function loadInformalityGeojson(): Promise<InformalityFeatureCollection> {
  if (cache) {
    return cache;
  }
  const response = await fetch(geojsonUrl);
  if (!response.ok) {
    throw new Error(`No se pudo cargar informal_data.geojson (${response.status})`);
  }
  const raw = (await response.json()) as FeatureCollection<Polygon | MultiPolygon>;
  const normalized = normalizeCollection(raw);
  cache = normalized;
  return normalized;
}

function normalizeCollection(
  raw: FeatureCollection<Polygon | MultiPolygon>,
): InformalityFeatureCollection {
  return {
    type: "FeatureCollection",
    features: raw.features
      .filter((feature) => feature.geometry)
      .map((feature) => ({
        type: "Feature",
        geometry: feature.geometry as MultiPolygon | Polygon,
        properties: normalizeProperties(feature.properties ?? {}),
      })),
  };
}

function normalizeProperties(raw: Record<string, any>): InformalityFeatureProperties {
  const profiles = cloneProfileDefaults();
  const profileEntries = Array.isArray(raw.profiles) ? raw.profiles : [];

  for (const entry of profileEntries) {
    if (!entry || typeof entry !== "object") {
      continue;
    }
    const label = String((entry as Record<string, unknown>).profile_label ?? "");
    const layer = PROFILE_SOURCE_LABEL_TO_ID[label as keyof typeof PROFILE_SOURCE_LABEL_TO_ID];
    if (!layer) {
      continue;
    }
    const sharePct = toNumber((entry as Record<string, unknown>).share_pct);
    const shareRank = toInt((entry as Record<string, unknown>).share_rank);
    const count = toNumber((entry as Record<string, unknown>).profile_count);
    const countRank = toInt((entry as Record<string, unknown>).count_rank);

    profiles[layer] = {
      label: label || PROFILE_LAYER_LABELS[layer],
      code: String((entry as Record<string, unknown>).profile_code ?? ""),
      sharePct,
      shareRank,
      shareRankScore: toRankScore(shareRank),
      count,
      countRank,
      countRankScore: toRankScore(countRank),
    };
  }

  const flattened = flattenProfiles(profiles);

  const wholesaleRate = toNumber(raw.tasa_informalidad_sector_43);
  const retailRate = toNumber(raw.tasa_informalidad_sector_46);

  return {
    cveEnt: String(raw.cve_ent ?? ""),
    stateName: String(raw.state_name ?? ""),
    wholesaleRate,
    retailRate,
    wholesaleRateDecimal: wholesaleRate / 100,
    retailRateDecimal: retailRate / 100,
    wholesaleValue: toNumber(raw.valor_agregado_mayor ?? raw.wholesale_va ?? 0),
    retailValue: toNumber(raw.valor_agregado_menor ?? raw.retail_va ?? 0),
    informalValue: toNumber(raw.informal_com_total),
    povertyRate: toNumber(raw.pobreza_2022_pct),
    imssGapRate: toNumber(raw.carenciaIMS_2022_pct),
    educationGapRate: toNumber(raw.regazoEdu_2022_pct),
    profiles,
    derivedProfileMetrics: flattened,
    ...flattened,
  };
}

function createEmptyProfileSnapshot(label: string): ProfileMetricSnapshot {
  return {
    label,
    code: "",
    sharePct: 0,
    shareRank: 0,
    shareRankScore: 0,
    count: 0,
    countRank: 0,
    countRankScore: 0,
  };
}

function cloneProfileDefaults(): Record<ProfileLayerId, ProfileMetricSnapshot> {
  return {
    cuidadoras: { ...PROFILE_DEFAULTS.cuidadoras },
    microtrap: { ...PROFILE_DEFAULTS.microtrap },
    desalentados: { ...PROFILE_DEFAULTS.desalentados },
  };
}

function flattenProfiles(profiles: Record<ProfileLayerId, ProfileMetricSnapshot>) {
  const entries: Record<string, number> = {};
  (Object.keys(profiles) as ProfileLayerId[]).forEach((key) => {
    const stats = profiles[key];
    entries[`profile_${key}_share_pct`] = stats.sharePct;
    entries[`profile_${key}_share_rank`] = stats.shareRank;
    entries[`profile_${key}_share_rank_score`] = stats.shareRankScore;
    entries[`profile_${key}_count`] = stats.count;
    entries[`profile_${key}_count_rank`] = stats.countRank;
    entries[`profile_${key}_count_rank_score`] = stats.countRankScore;
  });
  return entries;
}

function toNumber(value: unknown, fallback = 0): number {
  const result = Number(value);
  return Number.isFinite(result) ? result : fallback;
}

function toInt(value: unknown, fallback = 0): number {
  const result = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(result) ? result : fallback;
}

function toRankScore(rank: number): number {
  if (!rank || rank <= 0) {
    return 0;
  }
  return PROFILE_MAX_RANK + 1 - rank;
}
