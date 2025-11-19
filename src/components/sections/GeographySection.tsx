import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";
import { WholesaleRetailValueBar } from "../charts/WholesaleRetailValueBar";
import { InformalityMap } from "../maps/InformalityMap";
import { commerceLayerConfigs } from "../maps/mapLayerConfig";

const steps: ScrollStepConfig[] = [
  {
    id: "context",
    title: "¿Dónde se ancla la derrama informal?",
    body:
      "Son 265,864 mdp (0.83% del PIB) en comercios fuera del circuito formal. La barra superior mantiene los montos a la vista mientras revisas el territorio.",
  },
  {
    id: "wholesale",
    title: "Mayoreo: 7.2% con focos puntuales",
    body:
      "El mayoreo apenas suma 19,076 mdp informales. Se concentra en corredores logísticos con controles medianos; el norte se mantiene estable salvo nodos aislados.",
  },
  {
    id: "retail",
    title: "Menudeo domina la fuga",
    body:
      "Tienditas y micronegocios apalancan 246,788 mdp (92.8%). La informalidad promedio supera 65% y rompe 80% en el sur-sureste.",
  },
  {
    id: "territory",
    title: "Lectura estatal",
    body:
      "Explora cada estado para cruzar tasas y valor agregado. Nuevo León vs Oaxaca evidencia la brecha logística, de crédito y de inspección.",
  },
  {
    id: "insight",
    title: "Qué cuidar",
    body:
      "A más complejidad logística y financiamiento formal, menos informalidad. El reto es el retail atomizado: requiere trazabilidad digital y operativos móviles.",
  },
];

const mapModeByStep: Record<string, "wholesale" | "retail"> = {
  context: "retail",
  wholesale: "wholesale",
  retail: "retail",
  territory: "retail",
  insight: "retail",
};

export const GeographySection: React.FC = () => {
  return (
    <ScrollSection
      id="geografia"
      eyebrow="Sección 3"
      title="Geografía de la informalidad: mayoreo vs menudeo"
      lead="Mantén visibles los montos de mayoreo y menudeo mientras el mapa fija los focos territoriales de la informalidad."
      introContent={<WholesaleRetailValueBar />}
      steps={steps}
      background="light"
      renderGraphic={(activeStepId) => {
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
