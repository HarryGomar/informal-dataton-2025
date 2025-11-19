export const fiscalImpact = {
  iva: 12272,
  isrWorkers: 2049,
  isrOwners: 2109,
};

export const socialSecurityImpact = {
  imssPatronal: 11509.47,
  imssObrera: 1361.63,
  infonavit: 2866.57,
  pensions: 3107,
};

export const economicSpillover = {
  total: 838294,
  gdpShare: 2.6,
};

export const costSummaryCards = [
  {
    id: "fiscal",
    title: "$16,429 mdp",
    subtitle: "Impuestos federales no recaudados",
    amount: 16429,
    icon: "🏛️",
  },
  {
    id: "social",
    title: "$18,845 mdp",
    subtitle: "Aportaciones a seguridad social que no ingresan",
    amount: 18845,
    icon: "🩺",
  },
  {
    id: "gdp",
    title: "$838,294 mdp",
    subtitle: "Derrama económica anual (≈2.6% PIB)",
    amount: 838294,
    icon: "📈",
  },
];
