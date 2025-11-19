import React, { useEffect, useMemo, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import { Section } from "../layout/Section";
import { InformalityTimelineChart } from "../charts/InformalityTimelineChart";
import type { PolicyBandId } from "../charts/InformalityTimelineChart";
import { InformalityRealityPanel } from "../charts/InformalityRealityPanel";

type StoryStat = { label: string; value: string; detail?: string };

interface StoryStep {
  id: string;
  kicker?: string;
  title: string;
  summary: string;
  bullets?: string[];
  stats?: StoryStat[];
  body?: React.ReactNode;
  policyId?: PolicyBandId | null;
  annotation?: string | null;
  align?: "left" | "right";
}

const steps: StoryStep[] = [
  {
    id: "overview",
    kicker: "4.1 · Autopsia",
    title: "25 años de políticas casi sin movimiento",
    summary:
      "A pesar de cuatro generaciones de reformas, la tasa de informalidad bajó apenas ~4 puntos. Esta línea histórica muestra que los programas atacaron al evasor voluntario, no a los excluidos.",
    bullets: [
      "La serie 2000–2025 luce plana: el pico y el último dato siguen arriba de 54%",
      "Cada política prometió un salto, pero la variación total fue de solo 3.97 p.p.",
    ],
    stats: [
      { label: "Participación informal 1998", value: ">55%" },
      { label: "Participación informal 2025", value: "≈54%" },
    ],
    annotation: "Variación total 2000–2025: apenas 3.97 puntos.",
    align: "right",
  },
  {
    id: "repecos",
    kicker: "1998 – REPECOS",
    title: "El precipicio fiscal que mantuvo a todos chicos",
    summary:
      "El régimen de pequeños contribuyentes simplificó el pago, pero creó un incentivo para quedarse artificialmente pequeño y no brincar al esquema general.",
    bullets: [
      "El SAT calculó evasión >96% entre 2000 y 2010",
      "Se fomentó el enanismo fiscal: crecer significaba perder el beneficio",
      "No hubo integración con seguridad social ni financiamiento formal",
    ],
    stats: [
      { label: "Evasión estimada", value: ">96%", detail: "2000-2010" },
      { label: "Diagnóstico", value: "Informal = evasor" },
    ],
    policyId: "repecos",
    annotation: "La banda REPECOS domina 1998–2013 sin mover la línea.",
    align: "right",
  },
  {
    id: "sare",
    kicker: "2002 – SARE",
    title: "Confundir costo de entrada con permanencia",
    summary:
      "SARE creó ventanillas únicas y trámites exprés. Funcionó para nuevas empresas formales, pero no tocó a quienes ya operaban en la informalidad.",
    bullets: [
      "+5.6% de nuevas empresas formales en ciudades con SARE",
      "Impacto nulo sobre la tasa de informalidad laboral total",
      "Facilitó abrir, no sobrevivir ni contratar con prestaciones",
    ],
    stats: [
      { label: "Meta", value: "Reducir fricción" },
      { label: "Resultado", value: "0 p.p. de cambio" },
    ],
    policyId: "sare",
    annotation: "El spike administrativo aparece en 2002 sin alterar la curva.",
    align: "right",
  },
  {
    id: "rif",
    kicker: "2014 – RIF",
    title: "Incentivos temporales frente a beneficios permanentes",
    summary:
      "El RIF ofreció tasas crecientes y acceso subsidiado al IMSS, pero compitió contra el Seguro Popular gratuito y sumó burocracia digital (CFDI).",
    bullets: [
      "El padrón formal casi no creció",
      "La informalidad cayó solo ~1 p.p.",
      "Requería facturar electrónicamente — una carga que muchos micronegocios no podían sostener",
    ],
    stats: [
      { label: "Beneficio IMSS", value: "Temporal" },
      { label: "Seguro Popular", value: "Gratuito", detail: "y sin trámites" },
    ],
    policyId: "rif",
    annotation: "Tras 2014 apenas se percibe un diente en la línea.",
    align: "left",
  },
  {
    id: "resico",
    kicker: "2022 – RESICO",
    title: "Un régimen de confianza solo para quienes ya confían",
    summary:
      "RESICO simplifica la tributación de contribuyentes cumplidos. Es una economía de opción: sirve a los formales que facturan, no a los excluidos del sistema.",
    bullets: [
      "Tasas bajas sobre ingresos declarados, sin vínculo al IMSS",
      "No hay instrumentos para atraer a negocios completamente informales",
      "Repite el sesgo hacia el 20% voluntario",
    ],
    stats: [
      { label: "Público meta", value: "Formales activos" },
      { label: "Impacto en la línea", value: "Invisible" },
    ],
    policyId: "resico",
    annotation: "2022 añade otra banda verde sin inflexión visible.",
    align: "left",
  },
  {
    id: "diagnosis",
    kicker: "Conclusión",
    title: "El error fue tratar la exclusión como evasión",
    summary:
      "Las políticas asumieron que el problema era falta de voluntad para pagar. Pero la evidencia de Duval-Hernández separa preferencia y posibilidad: 80% son informales involuntarios.",
    bullets: [
      "Supuesto 1: los informales no saben cómo entrar (SARE)",
      "Supuesto 2: no quieren pagar impuestos/cuotas (REPECOS/RIF/RESICO)",
      "Realidad: la barrera es que no los contratan ni logran cruzar al mercado formal",
    ],
    body: (
      <p className="historic-card__math">
        P(no ser formal) ≈ P(no querer ser formal) × P(no ser contratado formalmente)
      </p>
    ),
    annotation: "La autopsia concluye: el problema es exclusión, no evasión.",
    align: "left",
  },
];

const triggerOrder = steps.map((step) => step.id);

const HistoricNarrativeCard: React.FC<{ step: StoryStep }> = ({ step }) => {
  return (
    <article key={step.id} className="historic-card" aria-live="polite">
      {step.kicker && <p className="eyebrow">{step.kicker}</p>}
      <h3>{step.title}</h3>
      <p className="historic-card__summary">{step.summary}</p>
      {step.bullets && (
        <ul className="historic-card__bullets">
          {step.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {step.body}
      {step.stats && step.stats.length > 0 && (
        <dl className="historic-card__stats">
          {step.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                <strong>{stat.value}</strong>
                {stat.detail && <span>{stat.detail}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
};

export const PolicyAutopsySection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>(steps[0].id);
  const [isMobileStack, setIsMobileStack] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileStack(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeStep = useMemo(() => steps.find((step) => step.id === activeStepId) ?? steps[0], [activeStepId]);
  const activePolicyId = activeStep.policyId ?? null;
  const cardAlign = activeStep.align ?? "right";
  const activeIndex = steps.findIndex((step) => step.id === activeStepId);

  const goToStep = (index: number) => {
    if (index < 0 || index >= steps.length) {
      return;
    }
    setActiveStepId(steps[index].id);
  };

  return (
    <Section id="diagnostico" layout="full" className="policy-autopsy" tone="plain">
      <div className="policy-autopsy__intro">
        <p className="eyebrow">Sección 4 · Historia</p>
        <h2>Autopsia de 25 años de políticas contra la informalidad</h2>
        <p>
          Mantén el scroll: la línea se mantiene fija mientras las tarjetas cuentan por qué REPECOS, SARE, RIF y RESICO
          no movieron la aguja. Al final, damos vuelta a la narrativa del 80% involuntario.
        </p>
      </div>

      <div className="policy-autopsy__scroller">
        <div className={`policy-autopsy__sticky-shell${isMobileStack ? " is-mobile" : ""}`} aria-live="polite">
          <div className="policy-autopsy__stage">
            <InformalityTimelineChart
              variant="full"
              activePolicyId={activePolicyId}
              showBands
              annotation={activeStep.annotation ?? null}
            />
            {isMobileStack ? (
              <div className="policy-autopsy__mobile-carousel">
                <button
                  type="button"
                  className="policy-autopsy__carousel-nav"
                  onClick={() => goToStep(activeIndex - 1)}
                  disabled={activeIndex <= 0}
                  aria-label="Tarjeta anterior"
                >
                  ‹
                </button>
                <div className="policy-autopsy__mobile-card is-active">
                  <HistoricNarrativeCard step={activeStep} />
                </div>
                <button
                  type="button"
                  className="policy-autopsy__carousel-nav"
                  onClick={() => goToStep(activeIndex + 1)}
                  disabled={activeIndex >= steps.length - 1}
                  aria-label="Siguiente tarjeta"
                >
                  ›
                </button>
              </div>
            ) : (
              <div className={`policy-autopsy__card-layer policy-autopsy__card-layer--${cardAlign}`} key={activeStep.id}>
                <HistoricNarrativeCard step={activeStep} />
              </div>
            )}
          </div>
        </div>

        {!isMobileStack && (
          <div className="policy-autopsy__steps" aria-hidden="true">
            <Scrollama offset={0.6} onStepEnter={({ data }) => setActiveStepId(data)}>
              {triggerOrder.map((id) => (
                <Step data={id} key={id}>
                  <div className="policy-autopsy__trigger">
                    <span>{steps.find((step) => step.id === id)?.title}</span>
                  </div>
                </Step>
              ))}
            </Scrollama>
          </div>
        )}
      </div>

      <InformalityRealityPanel />
    </Section>
  );
};
