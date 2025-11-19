import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";
import { WholesaleRetailValueBar } from "../charts/WholesaleRetailValueBar";
import { InformalityMap } from "../maps/InformalityMap";
import { commerceLayerConfigs } from "../maps/mapLayerConfig";

const steps: ScrollStepConfig[] = [
  {
    id: "intro",
    title: "¿Dónde se concentra la informalidad comercial?",
    body:
      "El comercio informal generó 265,864 mdp en 2023 (0.83% del PIB). Antes de explorar el mapa, destacamos el peso agregado de estas actividades.",
  },
  {
    id: "split",
    title: "Mayoreo vs menudeo",
    body:
      "El comercio al menudeo explica 93% del valor agregado informal. El mayoreo opera con estructuras más formales, mientras que el retail es atomizado y propenso a la informalidad.",
  },
  {
    id: "wholesale-map",
    title: "Mapa: informalidad en mayoreo",
    body:
      "La tasa nacional en mayoreo ronda el 33.5%. Observa cómo el centro-norte mantiene niveles moderados, pero aún existen focos por arriba de 40%.",
  },
  {
    id: "retail-map",
    title: "Mapa: informalidad en menudeo",
    body:
      "En menudeo la informalidad se dispara a 67.2% promedio y supera 80% en el sur. El mapa cambia a una gama de verdes más intensa para destacar el riesgo.",
  },
  {
    id: "select-state",
    title: "Comparar estados",
    body:
      "Pasa el cursor por cada estado para ver sus tasas de informalidad y valor agregado en cada segmento. Contrasta Nuevo León frente a Oaxaca o Tabasco para dimensionar la brecha.",
  },
  {
    id: "insight",
    title: "Insight: complejidad vs informalidad",
    body:
      "Mientras más compleja la logística y capital del subsector, menor la informalidad. El retail, con micronegocios dispersos, seguirá siendo el campo crítico para una política pública focalizada.",
  },
];

const mapModeByStep: Record<string, "wholesale" | "retail"> = {
  "wholesale-map": "wholesale",
  "retail-map": "retail",
  "select-state": "retail",
  insight: "retail",
};

export const GeographySection: React.FC = () => {
  return (
    <ScrollSection
      id="geografia"
      eyebrow="Sección 3"
      title="Geografía de la informalidad: mayoreo vs menudeo"
      lead="Usamos datos censales para mostrar cómo el retail concentra la mayor parte de la informalidad y dónde se localiza."
      steps={steps}
      background="light"
      renderGraphic={(activeStepId) => {
        if (activeStepId === "intro" || activeStepId === "split") {
          return <WholesaleRetailValueBar />;
        }

        const mode = mapModeByStep[activeStepId] ?? "retail";
        return (
          <div className="map-panel">
            <InformalityMap layer={commerceLayerConfigs[mode]} />
          </div>
        );
      }}
    />
  );
};
