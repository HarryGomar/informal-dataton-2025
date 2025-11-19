
export interface ShapVariable {
  id: string;
  label: string;
  category: "human_capital" | "enterprise" | "demography" | "institution" | "external";
  importance: number; // Absolute mean SHAP value
  direction: "positive" | "negative"; // Does it increase or decrease informality?
  description: string;
}

export const shapVariables: ShapVariable[] = [
  {
    id: "workers_per_company",
    label: "Trabajadores x Empresa",
    category: "enterprise",
    importance: 0.015,
    direction: "negative",
    description: "Empresas más grandes → menor informalidad",
  },
  {
    id: "mean_schooling",
    label: "Promedio Escolaridad",
    category: "human_capital",
    importance: 0.008,
    direction: "negative",
    description: "Más educación → menor informalidad",
  },
  {
    id: "bribe_share",
    label: "ENCIG Sec 8 - Soborno",
    category: "institution",
    importance: 0.004,
    direction: "positive",
    description: "Mayor corrupción → mayor informalidad",
  },
  {
    id: "fdi_zm",
    label: "Inversión Extranjera ZM",
    category: "external",
    importance: 0.002,
    direction: "negative",
    description: "Mayor inversión extranjera → menor informalidad",
  },
  {
    id: "female_pop",
    label: "% Pob Mujeres",
    category: "demography",
    importance: 0.0018,
    direction: "positive",
    description: "Mayor proporción de mujeres → mayor informalidad (brechas)",
  },
  {
    id: "higher_ed",
    label: "Instrucción superior",
    category: "human_capital",
    importance: 0.0015,
    direction: "negative",
    description: "Acceso a educación superior → menor informalidad",
  },
  {
    id: "female_head_household",
    label: "Tamaño hogar con jefa mujer",
    category: "demography",
    importance: 0.0014,
    direction: "positive",
    description: "Hogares grandes con jefa mujer → mayor informalidad",
  },
  {
    id: "overcrowding",
    label: "% Hacinamiento",
    category: "demography",
    importance: 0.0012,
    direction: "positive",
    description: "Mayor hacinamiento → mayor informalidad",
  },
  {
    id: "migrant_usa",
    label: "% Migrante USA",
    category: "external",
    importance: 0.0011,
    direction: "negative",
    description: "Migración histórica → remesas/cambios culturales",
  },
  {
    id: "age_0_4",
    label: "% Pob Edad 0-4",
    category: "demography",
    importance: 0.0010,
    direction: "positive",
    description: "Más niños pequeños → mayor necesidad de flexibilidad",
  },
  {
    id: "internet_access",
    label: "% Viv Internet",
    category: "human_capital",
    importance: 0.0009,
    direction: "negative",
    description: "Acceso digital → menor informalidad",
  },
  {
    id: "sat_procedure",
    label: "ENCIG Sec 7 - Tramite Sat",
    category: "institution",
    importance: 0.0008,
    direction: "positive",
    description: "Dificultad en trámites SAT → mayor informalidad",
  },
  {
    id: "indigenous_lang",
    label: "% Pob Lengua Indigena",
    category: "demography",
    importance: 0.0007,
    direction: "positive",
    description: "Barreras lingüísticas/estructurales",
  },
  {
    id: "age_15_29",
    label: "% Pob Edad 15-29",
    category: "demography",
    importance: 0.0006,
    direction: "positive",
    description: "Jóvenes enfrentan barreras de entrada al mercado formal",
  },
];

export const modelPerformance = {
  r2: 0.82,
  rmse: 0.0205,
  observations: 2500,
  predictors: 53,
  period: "2013–2020",
  variableCounts: {
    human_capital: 22,
    productivity: 9,
    enterprise: 8,
    institution: 10,
    external: 4,
  }
};
