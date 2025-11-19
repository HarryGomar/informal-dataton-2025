import React, { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { palette } from "../../theme/palette";

interface PhaseConfig {
  id: "assumption" | "reality";
  headline: string;
  subcopy: string;
  segments: { label: string; value: number; color: string; detail: string }[];
}

const panelPhases: PhaseConfig[] = [
  {
    id: "assumption",
    headline: "Supuesto de políticas: casi todos evaden por elección",
    subcopy: "Los programas fiscales partieron de la premisa de que la informalidad era, sobre todo, una decisión voluntaria.",
    segments: [
      { label: "Evasores voluntarios", value: 95, color: palette.accentCoral, detail: "Diagnóstico implícito" },
      { label: "Excluidos involuntarios", value: 5, color: "rgba(33, 56, 45, 0.15)", detail: "Casi invisibles" },
    ],
  },
  {
    id: "reality",
    headline: "Realidad empírica: 4 de cada 5 están excluidos",
    subcopy: "Duval-Hernández demuestra que la mayoría preferiría un empleo formal, pero no lo consigue por barreras estructurales.",
    segments: [
      { label: "Informales involuntarios", value: 80, color: palette.brand, detail: "Quieren ser formales" },
      { label: "Informales voluntarios", value: 20, color: palette.accentWarm, detail: "El 20% que elige" },
    ],
  },
];

const doughnutOptions: ChartOptions<"doughnut"> = {
  cutout: "60%",
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed?.toFixed(0)}%`,
      },
    },
  },
};

const buildData = (segments: PhaseConfig["segments"]): ChartData<"doughnut"> => ({
  labels: segments.map((segment) => segment.label),
  datasets: [
    {
      data: segments.map((segment) => segment.value),
      backgroundColor: segments.map((segment) => segment.color),
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
});

export const InformalityRealityPanel: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setPhaseIndex(1), 1800);
    return () => clearTimeout(timeout);
  }, []);

  const phase = panelPhases[phaseIndex];
  const chartData = useMemo(() => buildData(phase.segments), [phase]);

  return (
    <section className="reality-panel">
      <div className="reality-panel__grid">
        <div className="reality-panel__text">
          <p className="eyebrow">Transición 80 / 20</p>
          <h3>{phase.headline}</h3>
          <p>{phase.subcopy}</p>
          <div className="reality-panel__timeline" role="presentation">
            {panelPhases.map((item, index) => (
              <div key={item.id} className={`reality-panel__timeline-step${index <= phaseIndex ? " is-active" : ""}`}>
                <span>{index + 1}</span>
                <p>{index === 0 ? "Supuesto" : "Evidencia"}</p>
              </div>
            ))}
          </div>
          <small className="reality-panel__source">Fuente: Duval-Hernández et al. (2023).</small>
        </div>

        <div className="reality-panel__viz" aria-live="polite">
          <div className="reality-panel__donut">
            <Doughnut data={chartData} options={doughnutOptions} />
            <div className="reality-panel__donut-center">
              <span>{phase.segments[0].value}%</span>
              <small>{phase.segments[0].label}</small>
            </div>
          </div>
          <ul className="reality-panel__legend">
            {phase.segments.map((segment) => (
              <li key={segment.label}>
                <span className="pill" style={{ backgroundColor: segment.color }} />
                <div>
                  <strong>{segment.label}</strong>
                  <p>{segment.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="reality-panel__pictos" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className={`reality-panel__picto${index < 4 ? " is-majority" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
