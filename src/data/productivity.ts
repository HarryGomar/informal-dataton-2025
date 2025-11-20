export interface SubsectorProductivity {
  code: string;
  subsector: string;
  formalWorkers: number;
  informalWorkers: number;
  formalVA: number;
  informalVA: number;
}

export const productivityData: SubsectorProductivity[] = [
  {
    code: "431",
    subsector: "Alimentos y Bebidas (Mayoreo)",
    formalWorkers: 6_458,
    informalWorkers: 25_865,
    formalVA: 101_000,
    informalVA: 0,
  },
  {
    code: "432",
    subsector: "Textiles y Calzado (Mayoreo)",
    formalWorkers: 2_240,
    informalWorkers: 5_896,
    formalVA: 5_000,
    informalVA: 0,
  },
  {
    code: "433",
    subsector: "Farmacia y Electro. (Mayoreo)",
    formalWorkers: 1_722,
    informalWorkers: 7_115,
    formalVA: 16_000,
    informalVA: 0,
  },
  {
    code: "434",
    subsector: "Materias Primas (Mayoreo)",
    formalWorkers: 38_230,
    informalWorkers: 91_875,
    formalVA: 70_000,
    informalVA: 2_000,
  },
  {
    code: "435",
    subsector: "Maquinaria y Equipo (Mayoreo)",
    formalWorkers: 4_113,
    informalWorkers: 24_922,
    formalVA: 48_000,
    informalVA: 0,
  },
  {
    code: "436",
    subsector: "Camiones y Partes (Mayoreo)",
    formalWorkers: 683,
    informalWorkers: 3_878,
    formalVA: 7_000,
    informalVA: 0,
  },
  {
    code: "437",
    subsector: "Intermediación (Mayoreo)",
    formalWorkers: 24,
    informalWorkers: 190,
    formalVA: 0,
    informalVA: 0,
  },
  {
    code: "461",
    subsector: "Abarrotes y Alimentos (Menudeo)",
    formalWorkers: 869_026,
    informalWorkers: 1_141_072,
    formalVA: 41_000,
    informalVA: 13_000,
  },
  {
    code: "462",
    subsector: "Tiendas Autoservicio/Dptales",
    formalWorkers: 147,
    informalWorkers: 47_044,
    formalVA: 170_000,
    informalVA: 500,
  },
  {
    code: "463",
    subsector: "Ropa y Calzado (Menudeo)",
    formalWorkers: 201_010,
    informalWorkers: 299_941,
    formalVA: 29_000,
    informalVA: 4_000,
  },
  {
    code: "464",
    subsector: "Salud y Cuidado (Menudeo)",
    formalWorkers: 46_171,
    informalWorkers: 115_786,
    formalVA: 40_000,
    informalVA: 2_000,
  },
  {
    code: "465",
    subsector: "Papelería y Personales (Menudeo)",
    formalWorkers: 254_263,
    informalWorkers: 354_184,
    formalVA: 25_000,
    informalVA: 4_000,
  },
  {
    code: "466",
    subsector: "Enseres y Computadoras (Menudeo)",
    formalWorkers: 134_132,
    informalWorkers: 196_422,
    formalVA: 23_000,
    informalVA: 3_000,
  },
  {
    code: "467",
    subsector: "Ferretería y Vidrios (Menudeo)",
    formalWorkers: 88_924,
    informalWorkers: 165_545,
    formalVA: 33_000,
    informalVA: 2_000,
  },
  {
    code: "468",
    subsector: "Vehículos y Combustibles (Menudeo)",
    formalWorkers: 36_678,
    informalWorkers: 105_278,
    formalVA: 88_000,
    informalVA: 1_000,
  },
  {
    code: "469",
    subsector: "Medios Masivos (Menudeo)",
    formalWorkers: 411,
    informalWorkers: 740,
    formalVA: 2_000,
    informalVA: 0,
  },
];
