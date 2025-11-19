export type RomanQuarter = "I" | "II" | "III" | "IV";

export interface InformalityYearPoint {
  year: number;
  quarter: RomanQuarter;
  rate: number;
  maleRate: number;
  femaleRate: number;
  position: number;
}

export interface PolicyBand {
  id: "repecos" | "sare" | "rif" | "resico";
  title: string;
  label: string;
  startPosition: number;
  endPosition: number;
  summary: string;
  result: string;
  highlightStart: number;
  highlightEnd: number;
}

const quarterOffset: Record<RomanQuarter, number> = {
  I: 0,
  II: 0.25,
  III: 0.5,
  IV: 0.75,
};

const rawHistoricTable = `
| 2000 | II | 58.8 | 60 | 56.6 |
| 2000 | III | 58.2 | 59.6 | 55.4 |
| 2000 | IV | 58.3 | 59.4 | 56.1 |
| 2001 | I | 58.3 | 59.4 | 56.3 |
| 2001 | II | 58.3 | 59.3 | 56.2 |
| 2001 | III | 58.7 | 59.8 | 56.7 |
| 2001 | IV | 58.9 | 60.3 | 56.4 |
| 2002 | I | 59 | 60.1 | 56.9 |
| 2002 | II | 59.5 | 60.5 | 57.5 |
| 2002 | III | 59.7 | 61 | 57.1 |
| 2002 | IV | 59.7 | 60.9 | 57.3 |
| 2003 | I | 59.7 | 60.9 | 57.4 |
| 2003 | II | 60.1 | 61.3 | 57.8 |
| 2003 | III | 60.3 | 61.1 | 59 |
| 2003 | IV | 60.3 | 61 | 59 |
| 2004 | I | 59.5 | 60.3 | 58.1 |
| 2004 | II | 59.6 | 60.2 | 58.5 |
| 2004 | III | 60 | 60.7 | 58.8 |
| 2004 | IV | 59.7 | 60.4 | 58.5 |
| 2005 | I | 59.3 | 59.3 | 59.2 |
| 2005 | II | 59.5 | 59.4 | 59.8 |
| 2005 | III | 59.9 | 59.6 | 60.4 |
| 2005 | IV | 59.7 | 59.5 | 60.0 |
| 2006 | I | 58.7 | 58.6 | 58.8 |
| 2006 | II | 59.2 | 59.1 | 59.4 |
| 2006 | III | 58.1 | 58.0 | 58.4 |
| 2006 | IV | 57.8 | 57.6 | 58.2 |
| 2007 | I | 57.6 | 57.4 | 58.0 |
| 2007 | II | 58.0 | 57.5 | 58.8 |
| 2007 | III | 57.7 | 57.5 | 58.0 |
| 2007 | IV | 58.3 | 57.6 | 59.5 |
| 2008 | I | 57.7 | 57.2 | 58.5 |
| 2008 | II | 58.3 | 57.7 | 59.3 |
| 2008 | III | 58.0 | 57.8 | 58.4 |
| 2008 | IV | 58.4 | 58.2 | 58.8 |
| 2009 | I | 58.6 | 58.6 | 58.7 |
| 2009 | II | 59.4 | 59.4 | 59.5 |
| 2009 | III | 59.7 | 59.3 | 60.4 |
| 2009 | IV | 59.9 | 59.4 | 60.8 |
| 2010 | I | 59.5 | 59.1 | 60.1 |
| 2010 | II | 59.8 | 59.4 | 60.3 |
| 2010 | III | 59.1 | 58.6 | 60.0 |
| 2010 | IV | 59.1 | 58.9 | 59.5 |
| 2011 | I | 59.1 | 58.9 | 59.4 |
| 2011 | II | 59.1 | 58.6 | 59.9 |
| 2011 | III | 59.5 | 59.0 | 60.2 |
| 2011 | IV | 59.5 | 58.9 | 60.6 |
| 2012 | I | 59.3 | 58.9 | 60.0 |
| 2012 | II | 59.5 | 58.8 | 60.7 |
| 2012 | III | 59.7 | 59.0 | 60.7 |
| 2012 | IV | 59.5 | 58.9 | 60.5 |
| 2013 | I | 58.6 | 58.2 | 59.3 |
| 2013 | II | 58.8 | 58.2 | 59.7 |
| 2013 | III | 58.8 | 58.4 | 59.4 |
| 2013 | IV | 58.5 | 57.8 | 59.6 |
| 2014 | I | 57.9 | 57.4 | 58.6 |
| 2014 | II | 57.4 | 57.0 | 58.2 |
| 2014 | III | 57.7 | 57.5 | 58.2 |
| 2014 | IV | 57.8 | 57.4 | 58.4 |
| 2015 | I | 57.5 | 57.2 | 58.0 |
| 2015 | II | 57.7 | 57.2 | 58.5 |
| 2015 | III | 57.7 | 57.2 | 58.4 |
| 2015 | IV | 58.0 | 57.2 | 59.4 |
| 2016 | I | 57.2 | 56.7 | 58.0 |
| 2016 | II | 57.0 | 56.6 | 57.6 |
| 2016 | III | 57.2 | 56.7 | 58.1 |
| 2016 | IV | 57.1 | 56.8 | 57.6 |
| 2017 | I | 57.0 | 56.7 | 57.6 |
| 2017 | II | 56.4 | 56.2 | 56.7 |
| 2017 | III | 57.0 | 56.8 | 57.4 |
| 2017 | IV | 56.9 | 56.7 | 57.2 |
| 2018 | I | 56.6 | 56.4 | 56.9 |
| 2018 | II | 56.5 | 56.1 | 57.1 |
| 2018 | III | 56.5 | 56.4 | 56.8 |
| 2018 | IV | 56.5 | 56.0 | 57.3 |
| 2019 | I | 56.7 | 56.2 | 57.6 |
| 2019 | II | 56.2 | 55.5 | 57.2 |
| 2019 | III | 56.4 | 55.6 | 57.5 |
| 2019 | IV | 56.1 | 55.1 | 57.5 |
| 2020 | I | 55.9 | 55.3 | 56.7 |
| 2020 | II | 50.9 | 51.8 | 49.6 |
| 2020 | III | 54.2 | 55.0 | 52.8 |
| 2020 | IV | 55.4 | 55.4 | 55.4 |
| 2021 | I | 55.1 | 55.4 | 54.5 |
| 2021 | II | 56.2 | 56.2 | 56.1 |
| 2021 | III | 56.3 | 56.3 | 56.2 |
| 2021 | IV | 55.8 | 55.6 | 56.2 |
| 2022 | I | 55.2 | 55.0 | 55.6 |
| 2022 | II | 55.7 | 55.6 | 55.9 |
| 2022 | III | 55.6 | 55.5 | 55.7 |
| 2022 | IV | 55.1 | 54.4 | 56.1 |
| 2023 | I | 55.1 | 54.5 | 55.8 |
| 2023 | II | 55.2 | 54.6 | 56.0 |
| 2023 | III | 55.1 | 54.5 | 56.0 |
| 2023 | IV | 54.8 | 54.1 | 55.8 |
| 2024 | I | 54.3 | 53.5 | 55.6 |
| 2024 | II | 54.3 | 53.8 | 54.9 |
| 2024 | III | 54.6 | 54.1 | 55.4 |
| 2024 | IV | 54.5 | 54.0 | 55.2 |
| 2025 | I | 54.3 | 53.9 | 54.9 |
| 2025 | II | 54.8 | 54.5 | 55.3 |
`;

const sanitizeCell = (cell: string) => cell.trim().replace(/^\|/, "").replace(/\|$/, "");

const parsedTimeline: InformalityYearPoint[] = rawHistoricTable
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("| ---"))
  .map((line) => line.replace(/^\|\s*/, "").replace(/\s*\|$/, ""))
  .map((line) => line.split("|").map((cell) => sanitizeCell(cell)))
  .filter((cells) => cells.length === 5)
  .map(([yearStr, quarterStr, rateStr, maleStr, femaleStr]) => {
    const quarter = quarterStr as RomanQuarter;
    const year = Number(yearStr);
    return {
      year,
      quarter,
      rate: Number(rateStr),
      maleRate: Number(maleStr),
      femaleRate: Number(femaleStr),
      position: Number((year + quarterOffset[quarter]).toFixed(2)),
    } satisfies InformalityYearPoint;
  });

export const informalityTimeline: InformalityYearPoint[] = parsedTimeline;

export const policyBands: PolicyBand[] = [
  {
    id: "repecos",
    title: "REPECOS",
    label: "1998–2013",
    startPosition: 1998,
    endPosition: 2013.75,
    summary: "Régimen simplificado para micronegocios",
    result:
      "Derivó en un precipicio fiscal: la evasión superó 96% y se fomentó el enanismo fiscal.",
    highlightStart: 2000,
    highlightEnd: 2012.75,
  },
  {
    id: "sare",
    title: "SARE",
    label: "2002–2007",
    startPosition: 2002,
    endPosition: 2007,
    summary: "Trámites exprés para abrir empresas",
    result:
      "+5.6% de nuevas empresas formales en ciudades con SARE, pero sin impacto en la informalidad existente.",
    highlightStart: 2002,
    highlightEnd: 2008,
  },
  {
    id: "rif",
    title: "RIF",
    label: "2014–2021",
    startPosition: 2014,
    endPosition: 2021.75,
    summary: "Incorporación fiscal gradual con IMSS subsidiado",
    result:
      "El padrón formal casi no creció; la informalidad cayó apenas ~1 p.p. por falta de atractivo real.",
    highlightStart: 2014,
    highlightEnd: 2021.75,
  },
  {
    id: "resico",
    title: "RESICO",
    label: "2022–2024",
    startPosition: 2022,
    endPosition: 2024.75,
    summary: "Esquema simplificado de confianza para formales",
    result:
      "Facilita a quienes ya cumplen, pero no incorpora a los totalmente informales ni aporta seguridad social.",
    highlightStart: 2022,
    highlightEnd: 2024.75,
  },
];

const firstPoint = informalityTimeline[0];
const lastPoint = informalityTimeline[informalityTimeline.length - 1];
export const totalVariation = Number((firstPoint.rate - lastPoint.rate).toFixed(2));

export const timelineDomain = {
  min: informalityTimeline[0].position - 0.5,
  max: informalityTimeline[informalityTimeline.length - 1].position + 0.5,
};
