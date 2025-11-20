import React from "react";
import { tfpImpact } from "../../data/competition";

const bars = [
  {
    id: "without",
    label: "Sin competencia informal",
    value: tfpImpact.withoutCompetition,
  },
  {
    id: "with",
    label: "Con competencia informal",
    value: tfpImpact.withCompetition,
  },
];

export const FormalVsInformalTfpChart: React.FC = () => {
  const maxValue = Math.max(...bars.map((bar) => bar.value));
  const delta = tfpImpact.delta;
  const formattedDelta = `${delta < 0 ? "–" : delta > 0 ? "+" : ""}${Math.abs(delta)}%`;

  return (
    <div className="tfp-impact-card">
      <div className="tfp-impact-card__callout">
        <p className="tfp-impact-card__eyebrow">Impacto directo</p>
        <div className="tfp-impact-card__value" aria-label="Caída de productividad total de factores">
          <span className="tfp-impact-card__percent">{formattedDelta}</span>
          <span className="tfp-impact-card__trend" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M12 5v12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <p className="tfp-impact-card__caption">
          Productividad total de factores perdida frente a prácticas informales
        </p>
      </div>

      <div className="tfp-impact-card__chart" role="img" aria-label="Comparación de productividad según competencia informal">
        {bars.map((bar) => (
          <div className="tfp-impact-card__column" key={bar.id}>
            <div className="tfp-impact-card__bar-shell">
              <div
                className={
                  "tfp-impact-card__bar" + (bar.id === "with" ? " tfp-impact-card__bar--drop" : "")
                }
                style={{ height: `${(bar.value / maxValue) * 100}%` }}
              >
                <span>{bar.value}</span>
              </div>
            </div>
            <p>{bar.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
