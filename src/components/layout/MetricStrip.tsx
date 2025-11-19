import React from "react";

interface MetricStripProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}

export const MetricStrip: React.FC<MetricStripProps> = ({ icon, label, value, detail }) => {
  return (
    <article className="metric-strip">
      <div className="metric-strip__icon" aria-hidden>
        {icon}
      </div>
      <div className="metric-strip__body">
        <p className="metric-strip__label">{label}</p>
        <h3>{value}</h3>
        <p className="metric-strip__detail">{detail}</p>
      </div>
    </article>
  );
};
