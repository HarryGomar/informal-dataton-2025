import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";

const spilloverCards = [
  {
    id: "context",
    label: "Circuitos paralelos",
    value: "Sin apalancamiento",
    detail:
      "La derrama no accede a crédito ni inventarios formales, por lo que el dinero no escala ni vuelve a invertirse.",
  },
  {
    id: "calc",
    label: "Estimación anual",
    value: "$838,294 mdp",
    detail:
      "Suma de valor agregado informal (mayoreo + menudeo) y gastos operativos que hoy circulan fuera del radar fiscal.",
  },
  {
    id: "opportunity",
    label: "PIB liberable",
    value: "+2.6%",
    detail:
      "Integrar gradualmente este flujo equivale a agregar 2.6 puntos del PIB con empleo formal y cadenas productivas robustas.",
  },
];

const steps: ScrollStepConfig[] = [
  {
    id: "context",
    title: "Impacto inmediato en el crecimiento",
    body:
      "El comercio informal opera fuera del crédito y de las cadenas productivas. La derrama resultante queda encapsulada en micronegocios que no escalan ni se reinvierten en el territorio.",
  },
  {
    id: "calc",
    title: "Cómo estimamos los $838,294 mdp",
    body: (
      <ul className="spillover-list">
        <li>Valor agregado informal de mayoreo y menudeo medido en cuentas satélite.</li>
        <li>Gastos operativos que sostienen inventarios y nóminas en efectivo.</li>
        <li>Flujo que se mantendría en la economía formal si estos negocios se integraran.</li>
      </ul>
    ),
  },
  {
    id: "opportunity",
    title: "≈ 2.6% del PIB desbloqueable",
    body:
      "Formalizar gradualmente este segmento libera 2.6 puntos del PIB. Permite más inversión, empleo con seguridad social y un mercado interno más profundo que multiplica la derrama en barrios y ciudades.",
  },
];

const SpilloverIntro: React.FC = () => (
  <div className="spillover-intro">
    <div className="spillover-intro__headline">
      <p className="spillover-intro__eyebrow">Derrama económica que se escapa</p>
      <div className="spillover-intro__value-group">
        <span className="spillover-intro__value">+2.6%</span>
        <span className="spillover-intro__label">del PIB nacional</span>
      </div>
      <p>≈ $838,294 mdp que hoy no se integran a los circuitos formales ni se registran como crecimiento.</p>
    </div>

    <div className="spillover-intro__metrics">
      <article className="spillover-intro__metric-card">
        <p className="spillover-intro__metric-label">Monto anual fuera del radar</p>
        <strong>$838 mil mdp</strong>
        <span>Valor agregado informal de mayoreo y menudeo más sus costos operativos.</span>
      </article>
      <article className="spillover-intro__metric-card">
        <p className="spillover-intro__metric-label">Potencial de formalización</p>
        <strong>2.6 pts PIB</strong>
        <span>Equivale al crecimiento adicional que se lograría al integrar esta derrama.</span>
      </article>
    </div>
  </div>
);

interface SpilloverHighlightPanelProps {
  activeStepId: string;
}

const SpilloverHighlightPanel: React.FC<SpilloverHighlightPanelProps> = ({ activeStepId }) => (
  <div className="spillover-panel">
    <div className="spillover-panel__hero">
      <p className="spillover-panel__eyebrow">Potencial recuperable</p>
      <div className="spillover-panel__stat-group">
        <div className="spillover-panel__stat">
          <span className="spillover-panel__stat-label">PIB adicional</span>
          <strong className="spillover-panel__value">+2.6%</strong>
          <small>Impacto nacional si se integra la derrama.</small>
        </div>
        <div className="spillover-panel__stat">
          <span className="spillover-panel__stat-label">Equivalente anual</span>
          <strong className="spillover-panel__value">$838,294 mdp</strong>
          <small>Recursos que hoy no circulan formalmente.</small>
        </div>
      </div>
    </div>

    <div className="spillover-panel__grid">
      {spilloverCards.map((card) => (
        <article
          key={card.id}
          className={`spillover-panel__card${activeStepId === card.id ? " spillover-panel__card--active" : ""}`}
        >
          <p className="spillover-panel__card-label">{card.label}</p>
          <strong>{card.value}</strong>
          <p>{card.detail}</p>
        </article>
      ))}
    </div>

    <footer className="spillover-panel__footer">
      Integrar esta derrama significa crédito, inventarios y empleo formal que permanecen en la economía local.
    </footer>
  </div>
);

export const GdpSpilloverSection: React.FC = () => (
  <ScrollSection
    id="gdp-spillover"
    eyebrow="Paso 2.4"
    title="La derrama económica que se escapa"
    lead="El comercio informal representa 838 mil mdp que no se integran a los circuitos formales. Visualizamos este monto como un adicional del 2.6% del PIB."
    steps={steps}
    introContent={<SpilloverIntro />}
    background="muted"
    renderGraphic={(activeStepId) => <SpilloverHighlightPanel activeStepId={activeStepId} />}
  />
);
