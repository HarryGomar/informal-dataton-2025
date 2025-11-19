import React from "react";
import { Section } from "../layout/Section";
import { PilotExperimentChart } from "../charts/PilotExperimentChart";

const pilotFacts = [
  {
    label: "Zona piloto",
    value: "Zonas metropolitanas de Aguascalientes o Querétaro",
    detail: "Capacidad institucional, aliados ANTAD y densidad de comercio informal",
  },
  {
    label: "Escala",
    value: "~10,000 micronegocios",
    detail: "5,000 tratamiento · 5,000 control en colonias espejo",
  },
  {
    label: "Diseño",
    value: "RCT con aleatorización",
    detail: "Asignación transparente, seguimiento 24 meses",
  },
  {
    label: "Gobernanza",
    value: "Panel Economía-INEGI-ANTAD",
    detail: "Publica resultados y decide escalamiento",
  },
];

export const ImplementationSection: React.FC = () => {
  return (
    <Section id="implementation" tone="muted" layout="full">
      <div className="section-header section-header--center">
        <p className="section-header__eyebrow">Implementación y piloto</p>
        <div className="section-header__title-group">
          <h2>Piloto y evaluación: empezar en pequeño, medir en serio</h2>
          <p className="section-header__kicker">
            Un piloto experimental evita falsas certezas. Probamos Escalera Comercial con evidencia antes de escalarla.
          </p>
        </div>
      </div>

      <div className="stat-cards">
        {pilotFacts.map((fact) => (
          <article key={fact.label} className="stat-card">
            <p className="stat-card__label">{fact.label}</p>
            <strong>{fact.value}</strong>
            <p className="stat-card__caption">{fact.detail}</p>
          </article>
        ))}
      </div>

      <PilotExperimentChart />

      <div className="intro-note" style={{ marginTop: "2rem" }}>
        <p>
          Sólo si el piloto demuestra mejoras claras en productividad, tránsito hacia la formalidad y bienestar, se justificaría escalar el programa a otras zonas. La recaudación importa, pero medimos primero productividad y bienestar, coherentes con el diagnóstico de exclusión.
        </p>
      </div>
    </Section>
  );
};
