import React from "react";

const treatmentElements = [
  "Diagnóstico + clasificación por perfil",
  "Módulos de productividad (digital, compras, infraestructura)",
  "Escalera de formalización con beneficios escalonados"
];

const controlElements = [
  "Negocios comparables en colonias espejo",
  "Sin intervención durante el piloto",
  "Reciben reporte final tras evaluación"
];

const metrics = [
  {
    label: "Productividad",
    detail: "Ventas, utilidades, valor agregado por trabajador"
  },
  {
    label: "Formalización",
    detail: "RFC, IMSS dueño, primer trabajador"
  },
  {
    label: "Bienestar",
    detail: "Seguridad social y estabilidad de ingresos"
  },
  {
    label: "Fiscal y escalabilidad",
    detail: "Recaudación neta y costo-beneficio del programa"
  }
];

export const PilotExperimentChart: React.FC = () => {
  return (
    <div className="pilot-chart">
      <div className="pilot-chart__zone">
        <p className="pilot-chart__eyebrow">Zona piloto sugerida</p>
        <h3>Aguascalientes o Querétaro</h3>
        <p>Capacidad institucional alta, densidad de comercio informal y presencia de aliados ANTAD.</p>
      </div>

      <div className="pilot-chart__arms">
        <div className="pilot-card pilot-card--treatment">
          <div className="pilot-card__badge">Tratamiento · 5,000 negocios</div>
          <h4>Escalera Comercial completa</h4>
          <ul>
            {treatmentElements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pilot-card pilot-card--control">
          <div className="pilot-card__badge">Control · 5,000 negocios</div>
          <h4>Operación habitual</h4>
          <ul>
            {controlElements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pilot-chart__connector">
        <span>Diseño experimental (RCT)</span>
      </div>

      <div className="pilot-chart__metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className="pilot-metric">
            <p className="pilot-metric__label">{metric.label}</p>
            <p className="pilot-metric__detail">{metric.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
