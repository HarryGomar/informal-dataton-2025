import React from "react";

interface LadderStep {
  id: string;
  label: string;
  title: string;
  level: string;
  benefitsCount: number;
  icon: StepIconName;
  action: string;
  requirement: string;
  offer: string;
  emphasis: string;
  tags: string[];
}

type StepIconName = "diagnostic" | "productivity" | "integration" | "formal";

const ladderSteps: LadderStep[] = [
  {
    id: "step-1",
    label: "Peldaño 1",
    title: "Identificación y diagnóstico",
    level: "Nivel de formalidad: Bajo",
    benefitsCount: 1,
    icon: "diagnostic",
    action: "Censo de micronegocios y diagnóstico en tienda",
    requirement: "Requisitos fiscales: ninguno",
    offer: "Informe personalizado + clasificación por perfil",
    emphasis: "Convencer con información: 'Conoce tu negocio'.",
    tags: ["Censo inteligente", "Perfiles", "Diagnóstico"]
  },
  {
    id: "step-2",
    label: "Peldaño 2",
    title: "Escalamiento productivo",
    level: "Nivel de formalidad: Media-baja",
    benefitsCount: 3,
    icon: "productivity",
    action: "Capacitación, digitalización (POS) y mejoras operativas",
    requirement: "RFC simplificado como identificación",
    offer: "Acompañamiento técnico y módulos productivos",
    emphasis: "Productividad primero: más ventas, mejores márgenes.",
    tags: ["POS gratuito", "Compras consolidadas", "Mentoría"]
  },
  {
    id: "step-3",
    label: "Peldaño 3",
    title: "Integración a cadenas",
    level: "Nivel de formalidad: Media",
    benefitsCount: 5,
    icon: "integration",
    action: "Acceso a red mayorista de ANTAD y logística compartida",
    requirement: "Alta del dueño en IMSS y primer trabajador",
    offer: "Precios preferenciales y variedad ampliada",
    emphasis: "Romper la desventaja estructural de costos.",
    tags: ["IMSS", "Proveeduría", "Logística"]
  },
  {
    id: "step-4",
    label: "Peldaño 4",
    title: "Formalidad plena",
    level: "Nivel de formalidad: Plena",
    benefitsCount: 7,
    icon: "formal",
    action: "Integración completa a cadenas formales y fiscalización",
    requirement: "Cumplimiento fiscal + seguridad social del personal",
    offer: "Crédito bancario, licitaciones y reputación",
    emphasis: "La formalidad llega como consecuencia natural.",
    tags: ["Crédito", "Licitaciones", "Protección legal"]
  }
];

const StepIcon: React.FC<{ name: StepIconName }> = ({ name }) => {
  const stroke = "#1f2c23";
  switch (name) {
    case "diagnostic":
      return (
        <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
          <circle cx="22" cy="22" r="12" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="30" y1="30" x2="42" y2="42" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="14" y="10" width="16" height="6" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "productivity":
      return (
        <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
          <circle cx="18" cy="18" r="8" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="32" cy="32" r="6" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M18 10v4M10 18h4M18 26v-4M26 18h-4" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <rect x="8" y="32" width="20" height="8" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "integration":
      return (
        <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
          <rect x="6" y="20" width="24" height="16" rx="3" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="30" y="24" width="12" height="10" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="16" cy="40" r="3" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="34" cy="40" r="3" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M6 32h-3" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 20v-8h8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "formal":
    default:
      return (
        <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
          <rect x="10" y="14" width="28" height="24" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M18 38v-8h12v8" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M18 14v-6h12v6" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M12 22h4M12 28h4M32 22h4M32 28h4" stroke={stroke} strokeWidth="2" />
        </svg>
      );
  }
};

interface CommercialLadderChartProps {
  activeStepId: string;
}

export const CommercialLadderChart: React.FC<CommercialLadderChartProps> = ({ activeStepId }) => {
  const activeIndex = Math.max(
    0,
    ladderSteps.findIndex((step) => step.id === activeStepId)
  );
  const activeStep = ladderSteps[activeIndex] ?? ladderSteps[0];

  return (
    <div className="ladder-chart" aria-live="polite">
      <div className="ladder-chart__visual" role="presentation">
        {ladderSteps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          return (
            <div
              key={step.id}
              className={[
                "ladder-step",
                isActive ? "ladder-step--active" : "",
                isComplete ? "ladder-step--complete" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--step-index": index } as React.CSSProperties}
            >
              <div className="ladder-step__plate">
                <div className="ladder-step__icon" aria-hidden="true">
                  <StepIcon name={step.icon} />
                </div>
                <div className="ladder-step__text">
                  <p className="ladder-step__label">{step.label}</p>
                  <h4>{step.title}</h4>
                  <p className="ladder-step__meta">{step.level}</p>
                </div>
                {isComplete && <span className="ladder-step__check" aria-hidden="true">✓</span>}
              </div>
            </div>
          );
        })}
      </div>

      <aside className="ladder-chart__meta">
        <div className="ladder-metric">
          <p className="ladder-metric__label">Nivel de formalidad</p>
          <p className="ladder-metric__value">{activeStep.level.replace("Nivel de formalidad: ", "")}</p>
        </div>
        <div className="ladder-metric">
          <p className="ladder-metric__label">Beneficios activos</p>
          <p className="ladder-metric__value">{activeStep.benefitsCount}</p>
        </div>

        <div className="ladder-detail">
          <span className="ladder-detail__eyebrow">Acción detonadora</span>
          <p>{activeStep.action}</p>
        </div>
        <div className="ladder-detail">
          <span className="ladder-detail__eyebrow">Requisito</span>
          <p>{activeStep.requirement}</p>
        </div>
        <div className="ladder-detail">
          <span className="ladder-detail__eyebrow">Beneficio</span>
          <p>{activeStep.offer}</p>
        </div>

        <p className="ladder-emphasis">{activeStep.emphasis}</p>

        <div className="ladder-tags" aria-label="Beneficios activados">
          {activeStep.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </aside>
    </div>
  );
};
