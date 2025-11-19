import React from "react";
import { fiscalImpact } from "../../data/costs";

type HighlightKey = "iva" | "isrWorkers" | "isrOwners" | null;

interface TaxStackedBarChartProps {
  highlight?: HighlightKey;
}

const segments = [
  { id: "iva" as const, label: "IVA en ventas", amount: fiscalImpact.iva },
  { id: "isrOwners" as const, label: "ISR empresas", amount: fiscalImpact.isrOwners },
  { id: "isrWorkers" as const, label: "ISR asalariados", amount: fiscalImpact.isrWorkers },
];

const total = segments.reduce((sum, item) => sum + item.amount, 0);

export const TaxStackedBarChart: React.FC<TaxStackedBarChartProps> = ({ highlight = null }) => {
  return (
    <div className="tax-bar" aria-label="Detalle de impuestos federales no recaudados">
      <div className="tax-bar__track">
        {segments.map((segment) => {
          const width = (segment.amount / total) * 100;
          const isActive = highlight === segment.id;
          const isMuted = highlight && highlight !== segment.id;
          return (
            <div
              key={segment.id}
              className={`tax-bar__segment tax-bar__segment--${segment.id} ${
                isMuted ? "tax-bar__segment--muted" : ""
              } ${isActive ? "tax-bar__segment--active" : ""}`}
              style={{ width: `${width}%` }}
            >
              <span>{segment.label}</span>
              <strong>${segment.amount.toLocaleString("es-MX")} mdp</strong>
            </div>
          );
        })}
      </div>
      <p className="tax-bar__total">Total anual: ${total.toLocaleString("es-MX")} mdp</p>
    </div>
  );
};
