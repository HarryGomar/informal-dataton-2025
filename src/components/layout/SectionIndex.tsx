import React, { useMemo, useState } from "react";
import type { SectionPhase } from "../../data/sectionsIndex";

interface SectionIndexProps {
  phases: SectionPhase[];
  defaultPhaseId?: string;
}

export const SectionIndex: React.FC<SectionIndexProps> = ({ phases, defaultPhaseId }) => {
  const [activePhaseId, setActivePhaseId] = useState<string>(defaultPhaseId ?? phases[0]?.id ?? "");

  const activePhase = useMemo(() => phases.find((phase) => phase.id === activePhaseId) ?? phases[0], [activePhaseId, phases]);

  if (!activePhase) {
    return null;
  }

  return (
    <div className="section-index" aria-label="Índice de la narrativa">
      <div className="section-index__tabs" role="tablist">
        {phases.map((phase) => {
          const isActive = phase.id === activePhase.id;
          return (
            <button
              key={phase.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`section-index__tab${isActive ? " is-active" : ""}`}
              onClick={() => setActivePhaseId(phase.id)}
            >
              <span className="section-index__tab-label">{phase.title}</span>
              <span className="section-index__tab-kicker">{phase.kicker}</span>
            </button>
          );
        })}
      </div>

      <div className="section-index__body" role="tabpanel">
        <div className="section-index__phase-meta">
          <p className="section-index__phase-kicker">{activePhase.kicker}</p>
          <h3>{activePhase.title}</h3>
          <p>{activePhase.description}</p>
        </div>

        <div className="section-index__grid">
          {activePhase.sections.map((section) => (
            <a
              key={section.id}
              className="section-index__card"
              href={`#${section.anchor}`}
              aria-label={`${section.title}. Ir a la sección.`}
            >
              <div className="section-index__card-eyebrow">{section.eyebrow}</div>
              <h4>{section.title}</h4>
              <p>{section.summary}</p>
              <span className="section-index__card-link">Ver sección</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
