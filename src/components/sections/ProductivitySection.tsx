import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";
import { ProductivityBySubsectorChart } from "../charts/ProductivityBySubsectorChart";

const steps: ScrollStepConfig[] = [
  {
    id: "overview",
    title: "Trabajadores informales, baja productividad",
    body:
      "En múltiples subsectores, los ocupados informales superan a los formales, pero su aporte al valor agregado es menor. La asignación laboral está distorsionada.",
  },
  {
    id: "workers",
    title: "¿Quién emplea a más gente?",
    body:
      "El comercio informal absorbe más trabajadores en abarrotes, textiles y servicios personales. La gráfica contrasta barras formales vs informales para ocupación.",
  },
  {
    id: "value",
    title: "¿Quién genera más valor?",
    body:
      "Aunque emplean a más personas, los negocios informales generan menos valor agregado por trabajador. El gap se amplía en materiales de construcción y electrónicos.",
  },
  {
    id: "takeaway",
    title: "Asignación ineficiente",
    body:
      "Mientras los formales convierten mano de obra en crecimiento, los informales se estancan. Formalizar no solo recauda: acelera la productividad nacional.",
  },
];

const chartViewByStep: Record<string, "workers" | "value"> = {
  overview: "workers",
  workers: "workers",
  value: "value",
  takeaway: "value",
};

export const ProductivitySection: React.FC = () => (
  <ScrollSection
    id="productividad"
    eyebrow="Sección 4"
    title="Productividad laboral y asignación ineficiente"
    lead="Comparamos ocupación y valor agregado entre formales e informales para evidenciar la brecha de productividad."
    steps={steps}
    background="default"
    renderGraphic={(activeStepId) => <ProductivityBySubsectorChart view={chartViewByStep[activeStepId]} />}
  />
);
