import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";
import { GdpImpactBarChart } from "../charts/GdpImpactBarChart";

const steps: ScrollStepConfig[] = [
  {
    id: "context",
    title: "Impacto en el crecimiento",
    body:
      "El comercio informal opera al margen del crédito y de las cadenas productivas. El resultado es una derrama económica que no escala ni se reinvierte.",
  },
  {
    id: "calc",
    title: "Cómo estimamos los $838,294 mdp",
    body:
      "Sumamos el valor agregado informal (mayoreo + menudeo) y los gastos operativos. Es dinero que podría circular formalmente si estos negocios se integraran.",
  },
  {
    id: "opportunity",
    title: "≈ 2.6% del PIB potencial",
    body:
      "Formalizar gradualmente este segmento liberaría un 2.6% adicional del PIB. Más inversión, empleo de calidad y un mercado interno robusto dependen de cerrar la brecha.",
  },
];

export const GdpSpilloverSection: React.FC = () => (
  <ScrollSection
    id="gdp-spillover"
    eyebrow="Paso 2.4"
    title="La derrama económica que se escapa"
    lead="El comercio informal representa 838 mil mdp que no se integran a los circuitos formales. Visualizamos este monto como un adicional del 2.6% del PIB."
    steps={steps}
    background="muted"
    renderGraphic={(activeStepId) => (
      <GdpImpactBarChart highlight={activeStepId === "opportunity" || activeStepId === "calc"} />
    )}
  />
);
