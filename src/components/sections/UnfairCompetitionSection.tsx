import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";
import { FormalVsInformalTfpChart } from "../charts/FormalVsInformalTfpChart";

const steps: ScrollStepConfig[] = [
  {
    id: "context",
    title: "Competencia desleal",
    body:
      "Los negocios informales evitan costos regulatorios, fiscales y laborales. Las empresas formales deben competir con precios artificialmente bajos.",
  },
  {
    id: "impact",
    title: "–15% en productividad total de factores",
    body:
      "Estudios del BID muestran que la exposición a competencia informal reduce la PTF de las firmas formales en ~15%. Es una pérdida directa de eficiencia e inversión.",
  },
];

export const UnfairCompetitionSection: React.FC = () => (
  <ScrollSection
    id="competencia"
    eyebrow="Sección 5"
    title="Competencia desleal y freno a las empresas formales"
    lead="Operar junto a informales erosiona la productividad de las empresas que sí cumplen."
    steps={steps}
    background="muted"
    renderGraphic={() => <FormalVsInformalTfpChart />}
  />
);
