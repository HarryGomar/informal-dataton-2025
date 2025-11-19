import React from "react";
import { tfpImpact } from "../../data/competition";

export const FormalVsInformalTfpChart: React.FC = () => {
  return (
    <div className="tfp-chart">
      <div className="tfp-chart__bars">
        <div className="tfp-chart__bar" aria-label="PTF sin competencia informal">
          <span>100</span>
          <p>Sin competencia informal</p>
        </div>
        <div className="tfp-chart__bar tfp-chart__bar--drop" aria-label="PTF con competencia informal">
          <span>{tfpImpact.withCompetition}</span>
          <p>Con competencia informal</p>
        </div>
      </div>
      <div className="tfp-chart__delta">
        <strong>{tfpImpact.delta}%</strong>
        <p>Productividad total de factores perdida frente a prácticas informales</p>
      </div>
    </div>
  );
};
