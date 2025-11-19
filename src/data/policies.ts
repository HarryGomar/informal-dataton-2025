export interface InformalityYearPoint {
  year: number;
  rate: number;
}

export interface PolicyBand {
  id: "repecos" | "sare" | "rif" | "resico";
  title: string;
  startYear: number;
  endYear: number;
  summary: string;
  result: string;
  highlightStartYear: number;
  highlightEndYear: number;
  placement: "left" | "right" | "bottom";
}

export const informalityTimeline: InformalityYearPoint[] = [
  { year: 2000, rate: 58.7 },
  { year: 2002, rate: 58.1 },
  { year: 2004, rate: 57.4 },
  { year: 2006, rate: 57.9 },
  { year: 2008, rate: 58.2 },
  { year: 2010, rate: 57.6 },
  { year: 2012, rate: 57.1 },
  { year: 2014, rate: 56.4 },
  { year: 2016, rate: 56.9 },
  { year: 2018, rate: 56.2 },
  { year: 2020, rate: 55.9 },
  { year: 2022, rate: 55.3 },
  { year: 2024, rate: 54.8 },
];

export const policyBands: PolicyBand[] = [
  {
    id: "repecos",
    title: "REPECOS",
    startYear: 1998,
    endYear: 2013,
    summary: "Régimen simplificado que buscó incorporar micronegocios al SAT.",
    result:
      "Generó un precipicio fiscal: la evasión superó 96% y muchos negocios se quedaron artificialmente pequeños para no salir del esquema.",
    highlightStartYear: 2000,
    highlightEndYear: 2012,
    placement: "left",
  },
  {
    id: "sare",
    title: "SARE",
    startYear: 2002,
    endYear: 2007,
    summary: "Sistema de apertura rápida que redujo trámites para empresas nuevas.",
    result:
      "+5.6% de creación de empresas formales donde operó, pero impacto nulo sobre la informalidad existente: confundió costo de entrada con permanencia.",
    highlightStartYear: 2002,
    highlightEndYear: 2008,
    placement: "right",
  },
  {
    id: "rif",
    title: "RIF",
    startYear: 2014,
    endYear: 2021,
    summary: "Régimen de incorporación con incentivos fiscales y acceso subsidiado al IMSS.",
    result:
      "El padrón formal casi no creció y la informalidad solo cayó ~1 p.p.; la existencia de Seguro Popular y nuevas cargas administrativas restaron atractivo.",
    highlightStartYear: 2014,
    highlightEndYear: 2021,
    placement: "bottom",
  },
  {
    id: "resico",
    title: "RESICO",
    startYear: 2022,
    endYear: 2024,
    summary: "Esquema simplificado de confianza para quienes ya tributan formalmente.",
    result:
      "Funciona como régimen de economía de opción: simplifica a formales, pero no atrae a informales y no tiene vínculo directo con seguridad social.",
    highlightStartYear: 2022,
    highlightEndYear: 2024,
    placement: "right",
  },
];

const lastPoint = informalityTimeline[informalityTimeline.length - 1];
export const totalVariation = informalityTimeline[0].rate - lastPoint.rate;
