import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";

const spilloverInsights = [
  {
    id: "context",
    title: "Flujo atrapado en efectivo",
    description:
      "Opera sin crédito ni proveedores formales, por lo que el dinero rota entre micronegocios sin multiplicarse.",
  },
  {
  id: "calc",
    title: "Componentes del monto",
    description: "Valor agregado informal de mayoreo y menudeo más los gastos operativos que sostienen inventarios y nóminas.",
  },
  {
  id: "opportunity",
    title: "Palanca de crecimiento",
    description: "Integrarlo a cadenas y financiamiento formal lo convierte en inversión, empleo estable y mayor recaudación.",
  },
];

const steps: ScrollStepConfig[] = [
  {
    id: "context",
    title: "Por qué no suma al PIB",
    body:
      "La derrama de comercio informal queda fuera de crédito, proveedores formales y datos fiscales, así que el flujo no escala ni se reinvierte en la economía local.",
  },
  {
    id: "calc",
    title: "Componentes del cálculo",
    body: (
      <ul className="spillover-list">
        <li>Valor agregado informal de mayoreo y menudeo según las cuentas satélite.</li>
        <li>Gastos operativos que mantienen inventarios, nóminas y logística en efectivo.</li>
        <li>Escenario en el que ese flujo entra a cadenas formales y multiplica su impacto.</li>
      </ul>
    ),
  },
  {
    id: "opportunity",
    title: "Qué pasa si lo integramos",
    body:
      "Formalizar gradualmente este segmento libera ≈ $838,294 mdp (2.6% del PIB) para crédito productivo, empleo con seguridad social y encadenamientos regionales.",
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
      <p>≈ $838,294 mdp anuales de comercio informal que hoy no entran al crédito ni a los circuitos fiscales, por lo que no se registran como crecimiento.</p>
    </div>

    <div className="spillover-intro__metrics">
      <article className="spillover-intro__metric-card">
        <p className="spillover-intro__metric-label">Monto anual</p>
        <strong>$838,294 mdp</strong>
        <span>Valor agregado informal de mayoreo y menudeo más sus costos operativos.</span>
      </article>
      <article className="spillover-intro__metric-card">
        <p className="spillover-intro__metric-label">Equivalente macro</p>
        <strong>2.6% del PIB</strong>
        <span>Proporción que podría recuperarse si estos negocios se integran gradualmente.</span>
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
      <div className="spillover-panel__stat">
        <span className="spillover-panel__stat-label">PIB adicional estimado</span>
        <strong className="spillover-panel__value">+2.6% (≈ $838,294 mdp)</strong>
        <small>Flujo que hoy se queda fuera de bancos, proveedores formales y recaudación.</small>
      </div>
    </div>

    <div className="spillover-panel__grid">
      {spilloverInsights.map((insight) => (
        <article
          key={insight.id}
          className={`spillover-panel__card${activeStepId === insight.id ? " spillover-panel__card--active" : ""}`}
        >
          <p className="spillover-panel__card-label">{insight.title}</p>
          <p>{insight.description}</p>
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
