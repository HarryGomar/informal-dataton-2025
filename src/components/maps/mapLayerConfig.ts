import type { InformalityFeatureProperties, ProfileLayerId } from "../../types/geography";
import { PROFILE_LAYER_LABELS, PROFILE_MAX_RANK } from "../../types/geography";

export type MapPaletteStop = [number, string];

export interface MapLayerConfig {
  id: string;
  label: string;
  eyebrow?: string;
  description?: string;
  property: string;
  displayProperty?: string;
  domain: [number, number];
  palette: MapPaletteStop[];
  legend: {
    minLabel: string;
    maxLabel: string;
  };
  formatValue?: (value: number | null, properties: InformalityFeatureProperties) => string;
}

export type ProfileMetricType = "share_pct" | "share_rank" | "count" | "count_rank";

const percentFormatter = (value: number | null) => {
  if (value === null || !Number.isFinite(value)) {
    return "0.0%";
  }
  return `${(value as number).toFixed(1)}%`;
};

const integerFormatter = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 });

const formatCountValue = (value: number | null) => {
  if (!value || !Number.isFinite(value)) {
    return "0 personas";
  }
  return `${integerFormatter.format(value)} personas`;
};

const formatRank = (displayProperty: string) =>
  (_value: number | null, properties: InformalityFeatureProperties) => {
    const rankValue = Number(properties?.[displayProperty]);
    return rankValue > 0 ? `#${rankValue}` : "s/d";
  };

const wholesalePalette: MapPaletteStop[] = [
  [10, "#edf7f1"],
  [20, "#cdeedb"],
  [35, "#8fd2ad"],
  [50, "#53b482"],
  [70, "#1d7a55"],
];

const retailPalette: MapPaletteStop[] = [
  [30, "#fff2e6"],
  [45, "#ffd3b1"],
  [60, "#ffa45c"],
  [75, "#f46d2f"],
  [85, "#c43f00"],
];

export const commerceLayerConfigs: Record<"wholesale" | "retail", MapLayerConfig> = {
  wholesale: {
    id: "commerce-wholesale",
    eyebrow: "Mapa nacional",
    label: "Informalidad en mayoreo",
    description: "Tasa estatal del comercio al por mayor (sector 43).",
    property: "wholesaleRate",
    domain: [10, 70],
    palette: wholesalePalette,
    legend: {
      minLabel: "10%",
      maxLabel: "70%+",
    },
    formatValue: (value) => percentFormatter(value ?? 0),
  },
  retail: {
    id: "commerce-retail",
    eyebrow: "Mapa nacional",
    label: "Informalidad en menudeo",
    description: "Tasa estatal del comercio al por menor (sector 46).",
    property: "retailRate",
    domain: [30, 90],
    palette: retailPalette,
    legend: {
      minLabel: "30%",
      maxLabel: "90%+",
    },
    formatValue: (value) => percentFormatter(value ?? 0),
  },
};

const profileShareDomain: Record<ProfileLayerId, [number, number]> = {
  cuidadoras: [5, 18],
  microtrap: [50, 66],
  desalentados: [50, 66],
};

const profileSharePalettes: Record<ProfileLayerId, MapPaletteStop[]> = {
  cuidadoras: [
    [5, "#fdf0ff"],
    [8, "#f5c7ff"],
    [11, "#de8cff"],
    [14, "#b454f0"],
    [18, "#6d2bbf"],
  ],
  microtrap: [
    [50, "#f1fbf0"],
    [55, "#c7f2c5"],
    [58, "#8ae08e"],
    [62, "#4cc060"],
    [66, "#1f8b3a"],
  ],
  desalentados: [
    [50, "#eef6ff"],
    [55, "#c7defa"],
    [58, "#93bcf1"],
    [62, "#4d88d5"],
    [66, "#195293"],
  ],
};

const profileCountDomain: Record<ProfileLayerId, number> = {
  cuidadoras: 900_000,
  microtrap: 5_200_000,
  desalentados: 5_000_000,
};

const rankPalette: MapPaletteStop[] = [
  [0, "#f0f4ff"],
  [8, "#c9d8ff"],
  [16, "#9eb6ff"],
  [24, "#6f90ff"],
  [32, "#4254c7"],
];

const countPaletteBase: MapPaletteStop[] = [
  [0, "#fff3e8"],
  [0.25, "#ffd6b0"],
  [0.5, "#ffa566"],
  [0.75, "#f16a35"],
  [1, "#b93812"],
];

const buildCountPalette = (max: number): MapPaletteStop[] =>
  countPaletteBase.map(([ratio, color]) => [Math.round(max * ratio), color]);

export const PROFILE_METRIC_OPTIONS: Record<ProfileMetricType, string> = {
  share_pct: "% del total informal",
  share_rank: "Ranking por %",
  count: "Personas (conteo)",
  count_rank: "Ranking por conteo",
};

export function getProfileLayerConfig(
  profileId: ProfileLayerId,
  metric: ProfileMetricType,
): MapLayerConfig {
  const baseLabel = PROFILE_LAYER_LABELS[profileId];
  if (metric === "share_pct") {
    const domain = profileShareDomain[profileId];
    return {
      id: `profile-${profileId}-share`,
      eyebrow: baseLabel,
      label: `${baseLabel} · participación`,
      description: "Porcentaje del perfil dentro del comercio informal estatal.",
      property: `profile_${profileId}_share_pct`,
      domain,
      palette: profileSharePalettes[profileId],
      legend: {
        minLabel: `${domain[0]}%`,
        maxLabel: `${domain[1]}%+`,
      },
      formatValue: (value) => percentFormatter(value ?? 0),
    };
  }

  if (metric === "share_rank") {
    const displayProperty = `profile_${profileId}_share_rank`;
    return {
      id: `profile-${profileId}-share-rank`,
      eyebrow: baseLabel,
      label: `${baseLabel} · ranking por %`,
      description: "1 = mayor participación del perfil.",
      property: `profile_${profileId}_share_rank_score`,
      displayProperty,
      domain: [0, PROFILE_MAX_RANK],
      palette: rankPalette,
      legend: {
        minLabel: "Menor presencia",
        maxLabel: "Mayor presencia",
      },
      formatValue: formatRank(displayProperty),
    };
  }

  if (metric === "count") {
    const maxCount = profileCountDomain[profileId];
    return {
      id: `profile-${profileId}-count`,
      eyebrow: baseLabel,
      label: `${baseLabel} · personas`,
      description: "Conteo estimado de personas en este perfil.",
      property: `profile_${profileId}_count`,
      domain: [0, maxCount],
      palette: buildCountPalette(maxCount),
      legend: {
        minLabel: "0",
        maxLabel: `${integerFormatter.format(maxCount)}+`,
      },
      formatValue: (value) => formatCountValue(value ?? 0),
    };
  }

  if (metric === "count_rank") {
    const displayProperty = `profile_${profileId}_count_rank`;
    return {
      id: `profile-${profileId}-count-rank`,
      eyebrow: baseLabel,
      label: `${baseLabel} · ranking por personas`,
      description: "1 = estados con más personas en el perfil.",
      property: `profile_${profileId}_count_rank_score`,
      displayProperty,
      domain: [0, PROFILE_MAX_RANK],
      palette: rankPalette,
      legend: {
        minLabel: "Menos personas",
        maxLabel: "Más personas",
      },
      formatValue: formatRank(displayProperty),
    };
  }

  return getProfileLayerConfig(profileId, "share_pct");
}