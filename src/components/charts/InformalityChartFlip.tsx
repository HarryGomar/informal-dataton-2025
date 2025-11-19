import React, { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { palette } from "../../theme/palette";

interface SegmentConfig {
  label: string;
  value: number;
  color: string;
  tooltip: string;
}

type ChartFace = "assumption" | "reality";

interface FaceConfig {
  id: ChartFace;
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  segments: SegmentConfig[];
}

const baseOptions: ChartOptions<"doughnut"> = {
  cutout: "62%",
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed?.toFixed(0)}%`,
      },
    },
  },
};

const assumptionConfig: FaceConfig = {
  id: "assumption",
  title: "Estado A — supuesto de las políticas",
  subtitle: "Informalidad = evasores voluntarios",
  highlight: "≈95%",
  description:
    "Durante décadas, el diseño regulatorio asumió que casi toda la informalidad era una decisión consciente de no pagar impuestos.",
  segments: [
    {
      label: "Evasores voluntarios",
      value: 95,
      color: palette.accentCoral,
      tooltip: "Lo que se intentó combatir con REPECOS/RIF/RESICO.",
    },
    {
      label: "Excluidos involuntarios",
      value: 5,
      color: "rgba(31, 44, 35, 0.15)",
      tooltip: "Casi invisibles en el diagnóstico oficial.",
    },
  ],
};

const realityConfig: FaceConfig = {
  id: "reality",
  title: "Estado B — evidencia empírica",
  subtitle: "≈80% son informales involuntarios",
  highlight: "80%",
  description:
    "Duval-Hernández muestra que la mayoría preferiría un empleo formal con prestaciones, pero no logra ser contratada ni despegar sus negocios.",
  segments: [
    {
      label: "Informales involuntarios",
      value: 80,
      color: palette.brand,
      tooltip: "Quieren ser formales pero están excluidos.",
    },
    {
      label: "Informales voluntarios",
      value: 20,
      color: palette.accentWarm,
      tooltip: "Buscan flexibilidad o evasión.",
    },
  ],
};

const faceConfigs: Record<ChartFace, FaceConfig> = {
  assumption: assumptionConfig,
  reality: realityConfig,
};

const buildChartData = (segments: SegmentConfig[]): ChartData<"doughnut"> => ({
  labels: segments.map((segment) => segment.label),
  datasets: [
    {
      data: segments.map((segment) => segment.value),
      backgroundColor: segments.map((segment) => segment.color),
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
});

const assumptionData = buildChartData(assumptionConfig.segments);
const realityData = buildChartData(realityConfig.segments);

export const InformalityChartFlip: React.FC = () => {
  const [view, setView] = useState<ChartFace>("reality");

  const chartData = useMemo(() => {
    return view === "reality" ? realityData : assumptionData;
  }, [view]);

  const activeConfig = faceConfigs[view];

  return (
    <div className={`informality-flip informality-flip--${view}`}>
      <div className="informality-flip__controls" role="tablist" aria-label="Cambiar vista del pastel">
        <button
          type="button"
          className={`informality-flip__control${view === "assumption" ? " is-active" : ""}`}
          onClick={() => setView("assumption")}
          role="tab"
          aria-selected={view === "assumption"}
        >
          Supuesto de políticas
        </button>
        <button
          type="button"
          className={`informality-flip__control${view === "reality" ? " is-active" : ""}`}
          onClick={() => setView("reality")}
          role="tab"
          aria-selected={view === "reality"}
        >
          Evidencia empírica
        </button>
      </div>

      <div className="informality-flip__card" aria-live="polite">
        <p className="informality-flip__eyebrow">{activeConfig.title}</p>
        <h3>{activeConfig.subtitle}</h3>
        <div className="informality-flip__chart">
          <Doughnut data={chartData} options={baseOptions} />
          <div className="informality-flip__center">
            <span>{activeConfig.highlight}</span>
            <p>{view === "reality" ? "Involuntarios" : "Evasores"}</p>
          </div>
        </div>
        <p className="informality-flip__description">{activeConfig.description}</p>
        <ul className="informality-flip__legend">
          {activeConfig.segments.map((segment) => (
            <li key={segment.label}>
              <span className="pill" style={{ backgroundColor: segment.color }} />
              <div>
                <strong>{segment.label}</strong>
                <p>{segment.tooltip}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
