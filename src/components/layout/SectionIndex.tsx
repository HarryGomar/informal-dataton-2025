import React, { useMemo, useState } from "react";
import type { SectionPhase } from "../../data/sectionsIndex";

interface SectionIndexProps {
  phases: SectionPhase[];
}

export const SectionIndex: React.FC<SectionIndexProps> = ({ phases }) => {
  if (!phases || phases.length === 0) {
    return null;
  }

  const [activePhaseId, setActivePhaseId] = useState<string>(phases[0]?.id ?? "");
  const activePhase = useMemo(() => phases.find((phase) => phase.id === activePhaseId) ?? phases[0], [activePhaseId, phases]);

  if (!activePhase) {
    return null;
  }

  return (
    <nav className="section-index section-index--compact" aria-label="Índice de la narrativa">
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

      <div className="section-index__panel" role="tabpanel">
        <div className="section-index__phase-meta">
          <span className="section-index__phase-kicker">{activePhase.kicker}</span>
          <p className="section-index__phase-title">{activePhase.title}</p>
        </div>

        <ul className="section-index__links">
          {activePhase.sections.map((section) => (
            <li key={section.id}>
              <a className="section-index__link" href={`#${section.anchor}`}>
                <span className="section-index__link-eyebrow">{section.eyebrow}</span>
                <span className="section-index__link-title">{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
