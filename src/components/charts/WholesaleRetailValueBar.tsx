import React from "react";
import { wholesaleRetailTotals } from "../../data/geography";

export const WholesaleRetailValueBar: React.FC = () => {
  const wholesaleShare = (wholesaleRetailTotals.wholesale / wholesaleRetailTotals.total) * 100;
  const retailShare = 100 - wholesaleShare;

  return (
    <div className="wholesale-retail-bar">
      <header>
        <p className="eyebrow">Valor agregado informal 2023</p>
        <h3>
          ${wholesaleRetailTotals.total.toLocaleString("es-MX")} mdp · 0.83% del PIB
        </h3>
        <p>
          El menudeo concentra el 93% de la derrama: tiendas, micronegocios y puestos que operan
          fuera del circuito formal.
        </p>
      </header>

      <div className="wholesale-retail-bar__track" aria-label="Distribución mayoreo vs menudeo">
        <div className="wholesale-retail-bar__segment" style={{ width: `${wholesaleShare}%` }}>
          <span>Mayoreo · {wholesaleShare.toFixed(1)}%</span>
        </div>
        <div className="wholesale-retail-bar__segment wholesale-retail-bar__segment--retail" style={{ width: `${retailShare}%` }}>
          <span>Menudeo · {retailShare.toFixed(1)}%</span>
        </div>
      </div>

      <div className="wholesale-retail-bar__legend">
        <div>
          <strong>${wholesaleRetailTotals.wholesale.toLocaleString("es-MX")} mdp</strong>
          <p>Comercio al por mayor</p>
        </div>
        <div>
          <strong>${wholesaleRetailTotals.retail.toLocaleString("es-MX")} mdp</strong>
          <p>Comercio al por menor</p>
        </div>
      </div>
    </div>
  );
};
