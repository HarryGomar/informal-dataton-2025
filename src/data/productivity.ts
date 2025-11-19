export interface SubsectorProductivity {
  subsector: string;
  formalWorkers: number;
  informalWorkers: number;
  formalVA: number;
  informalVA: number;
}

export const productivityData: SubsectorProductivity[] = [
  {
    subsector: "Abarrotes y víveres",
    formalWorkers: 180,
    informalWorkers: 320,
    formalVA: 42,
    informalVA: 18,
  },
  {
    subsector: "Textiles y calzado",
    formalWorkers: 140,
    informalWorkers: 260,
    formalVA: 36,
    informalVA: 14,
  },
  {
    subsector: "Electrónicos",
    formalWorkers: 120,
    informalWorkers: 210,
    formalVA: 40,
    informalVA: 16,
  },
  {
    subsector: "Materiales de construcción",
    formalWorkers: 160,
    informalWorkers: 190,
    formalVA: 48,
    informalVA: 21,
  },
  {
    subsector: "Salud y belleza",
    formalWorkers: 110,
    informalWorkers: 240,
    formalVA: 35,
    informalVA: 12,
  },
];
