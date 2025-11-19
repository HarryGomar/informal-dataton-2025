import React from "react";
import { wholesaleRetailTotals } from "../../data/geography";

const formatCurrency = (value: number) => `$${value.toLocaleString("es-MX")} mdp`;

export const WholesaleRetailValueBar: React.FC = () => {
  const wholesaleShare = (wholesaleRetailTotals.wholesale / wholesaleRetailTotals.total) * 100;
  const retailShare = 100 - wholesaleShare;

  const bars = [
    {
      id: "wholesale",
      label: "Mayoreo",
      share: wholesaleShare,
      amount: wholesaleRetailTotals.wholesale,
      detail: "Comercio al por mayor",
    },
    {
      id: "retail",
      label: "Menudeo",
      share: retailShare,
      amount: wholesaleRetailTotals.retail,
      detail: "Comercio al por menor",
    },
  ];

  return (
    <div className="geography-panel">
      <header className="geography-panel__summary">
        <p className="eyebrow">Derrama informal 2023</p>
        <h3>{formatCurrency(wholesaleRetailTotals.total)} · 0.83% del PIB</h3>
        <p>
          El menudeo concentra el 93% de la derrama: tienditas, micronegocios y puestos fuera del
          circuito formal.
        </p>
      </header>

      <div className="geography-dual-bars" role="list" aria-label="Comparativo mayoreo vs menudeo">
        {bars.map((bar) => (
          <article className="geography-dual-bars__item" key={bar.id} role="listitem">
            <div className="geography-dual-bars__meta">
              <span>{bar.label}</span>
              <strong>{bar.share.toFixed(1)}%</strong>
            </div>
            <div className="geography-dual-bars__track" aria-label={`${bar.label} ${bar.share.toFixed(1)}%`}>
              <div
                className={`geography-dual-bars__fill geography-dual-bars__fill--${bar.id}`}
                style={{ width: `${bar.share}%` }}
              />
            </div>
            <p className="geography-dual-bars__amount">{formatCurrency(bar.amount)}</p>
            <p className="geography-dual-bars__detail">{bar.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
