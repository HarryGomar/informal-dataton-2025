import React from "react";
import { economicSpillover } from "../../data/costs";

interface GdpImpactBarChartProps {
  highlight?: boolean;
}

export const GdpImpactBarChart: React.FC<GdpImpactBarChartProps> = ({ highlight = true }) => {
  return (
    <div className="gdp-impact">
      <div className="gdp-impact__number">
        <span>Derrama económica informal</span>
        <strong>${economicSpillover.total.toLocaleString("es-MX")} mdp</strong>
      </div>
      <p className="gdp-impact__subtitle">≈ {economicSpillover.gdpShare}% del PIB nacional</p>
      <div className="gdp-impact__bar" aria-label="Impacto en el PIB">
        <div
          className="gdp-impact__bar-fill"
          style={{ width: highlight ? `${economicSpillover.gdpShare}%` : "1%" }}
        />
        <span className="gdp-impact__bar-label">+{economicSpillover.gdpShare}%</span>
      </div>
      <p className="gdp-impact__note">
        Estimamos la derrama sumando el valor agregado informal y los gastos de operación de los
        comercios informales. Integrarlos a la formalidad liberaría este potencial.
      </p>
    </div>
  );
};
