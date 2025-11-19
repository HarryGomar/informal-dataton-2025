import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import type { ScrollStepConfig } from "../../types/sections";
import { Section } from "../layout/Section";
import { InformalityTimelineChart } from "../charts/InformalityTimelineChart";
import type { PolicyBandId } from "../charts/InformalityTimelineChart";
import { InformalityChartFlip } from "../charts/InformalityChartFlip";
import { totalVariation } from "../../data/policies";

type PolicyStep = ScrollStepConfig & { timelineEndYear?: number };

const steps: PolicyStep[] = [
  {
    id: "overview",
    title: "25 años de políticas, casi sin cambio",
    body:
      "La trayectoria de la informalidad laboral total apenas cayó ~3–4 puntos porcentuales en 25 años. En 1998 más de la mitad de la fuerza laboral era informal y hoy sigue rondando 55%. La gráfica sirve como autopsia: veremos cómo REPECOS, SARE, RIF y RESICO apenas mueven la aguja.",
  },
  {
    id: "repecos",
    title: "1998 – Régimen de Pequeños Contribuyentes (REPECOS)",
    body: (
      <>
        <p>
          REPECOS simplificó el pago de impuestos para micronegocios, pero terminó creando un
          "precipicio fiscal": más valía quedarse chico que crecer y enfrentar la carga formal.
        </p>
        <p>
          Evaluaciones muestran tasas de evasión superiores a 96% entre 2000 y 2010; prácticamente
          nadie pagaba lo que debía y se fomentó el enanismo fiscal.
        </p>
      </>
    ),
  },
  {
    id: "sare",
    title: "2002 – Sistema de Apertura Rápida de Empresas (SARE)",
    body: (
      <>
        <p>
          SARE redujo trámites para abrir negocios formales (+5.6% de nuevas empresas en ciudades
          donde operó), pero confundió costo de entrada con permanencia.
        </p>
        <p>
          No logró convertir negocios informales existentes en formales ni mover la tasa global de
          informalidad.
        </p>
      </>
    ),
  },
  {
    id: "rif",
    title: "2014 – Régimen de Incorporación Fiscal (RIF)",
    body: (
      <>
        <p>
          Sustituyó a REPECOS con incentivos como IMSS subsidiado y tasas graduales. Buscaba provocar
          el "salto" a la formalidad ofreciendo beneficios temporales.
        </p>
        <p>
          Resultado: el padrón formal casi no creció y la informalidad apenas cayó ~1 punto. El
          Seguro Popular y la carga administrativa (CFDI) neutralizaron la oferta del RIF.
        </p>
      </>
    ),
  },
  {
    id: "resico",
    title: "2022 – Régimen Simplificado de Confianza (RESICO)",
    body: (
      <>
        <p>
          RESICO simplifica la vida de quienes ya son formales con tasas bajas sobre ingresos, pero
          no es una política de formalización.
        </p>
        <p>
          Opera como un régimen de economía de opción sin vínculo a la seguridad social, por lo que
          casi no toca al universo completamente informal.
        </p>
      </>
    ),
  },
  {
    id: "diagnosis",
    title: "¿Por qué no funcionó? Un diagnóstico equivocado",
    body: (
      <>
        <p>
          Todas estas reformas partieron de dos supuestos erróneos: que los informales no sabían cómo
          entrar a la formalidad (visión SARE) o que no querían pagar impuestos/cuotas (visión
          REPECOS/RIF/RESICO).
        </p>
        <p>
          La evidencia de Duval-Hernández sugiere lo contrario: ≈80% de los trabajadores informales
          urbanos son involuntarios. Prefieren prestaciones y estabilidad, pero no pueden acceder por
          exclusión estructural.
        </p>
        <p>
          P(no ser formal) ≈ P(no querer ser formal) × P(no ser contratado formalmente). La mayoría
          cae en el segundo factor: sí quiere, pero no es contratada. Diseñamos incentivos para el
          20% equivocado.
        </p>
      </>
    ),
  },
];

const policyByStep: Record<string, PolicyBandId | null> = {
  repecos: "repecos",
  sare: "sare",
  rif: "rif",
  resico: "resico",
};

export const PolicyAutopsySection: React.FC = () => {
  const initialStepId = steps[0]?.id ?? "overview";
  const [activeStepId, setActiveStepId] = useState<string>(initialStepId);
  const isFlipView = activeStepId === "diagnosis";
  const activePolicyId = policyByStep[activeStepId] ?? null;
  const shouldShowBands = Boolean(activePolicyId);
  const summaryVisible = activeStepId === "diagnosis";

  return (
    <Section id="diagnostico" layout="full" className="policy-autopsy" tone="plain">
      <div className="policy-autopsy__header">
        <p className="eyebrow">Sección 4</p>
        <div>
          <h2 className="section-title">Autopsia de políticas fallidas: un historial de intentos</h2>
          <p className="section-lead">
            La historia reciente está llena de programas para supuestamente reducir la informalidad comercial.
            Sin embargo, la línea histórica permanece casi plana porque partimos de un diagnóstico equivocado.
          </p>
        </div>
      </div>

      <div className="policy-autopsy__scroller">
        <div className="policy-autopsy__timeline">
          <div className="policy-autopsy__sticky">
            {isFlipView ? (
              <InformalityChartFlip />
            ) : (
              <InformalityTimelineChart variant="full" activePolicyId={activePolicyId} showBands={shouldShowBands} />
            )}
          </div>
        </div>

        <div className="policy-autopsy__steps">
          <Scrollama offset={0.65} onStepEnter={({ data }) => setActiveStepId(data)}>
            {steps.map((step) => (
              <Step data={step.id} key={step.id}>
                <article className={`scroll-step${activeStepId === step.id ? " scroll-step--active" : ""}`}>
                  {step.eyebrow && <p className="eyebrow">{step.eyebrow}</p>}
                  <h3>{step.title}</h3>
                  <div className="scroll-step__body">
                    {typeof step.body === "string" ? <p>{step.body}</p> : step.body}
                  </div>
                  {step.footnote && <small className="scroll-step__footnote">{step.footnote}</small>}
                </article>
              </Step>
            ))}
          </Scrollama>
        </div>
      </div>

      <div className={`policy-autopsy__summary${summaryVisible ? " is-visible" : ""}`} aria-hidden={!summaryVisible}>
        <p className="eyebrow">Conclusión</p>
        <h3>Variación total 2000–2024: {totalVariation.toFixed(2)} p.p.</h3>
        <p>
          A pesar de cada programa, la curva permanece plana. El problema no es falta de incentivos para el evasor voluntario,
          sino barreras estructurales que impiden a cuatro de cada cinco trabajadores acceder a un empleo formal.
        </p>
      </div>
    </Section>
  );
};
