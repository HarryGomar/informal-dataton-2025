import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import { CommercialLadderChart } from "../charts/CommercialLadderChart";
import { InstitutionalArchitectureDiagram } from "../charts/InstitutionalArchitectureDiagram";
import { Section } from "../layout/Section";

const pillars = [
  {
    title: "Integración a cadenas",
    detail: "Compras consolidadas con ANTAD, logística compartida y acceso a mayoreo.",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
        <rect x="8" y="18" width="24" height="18" rx="3" fill="none" stroke="#1f2c23" strokeWidth="2" />
        <rect x="26" y="24" width="14" height="10" rx="2" fill="none" stroke="#1f2c23" strokeWidth="2" />
        <circle cx="16" cy="38" r="3" fill="none" stroke="#1f2c23" strokeWidth="2" />
        <circle cx="34" cy="38" r="3" fill="none" stroke="#1f2c23" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Desarrollo de capacidades",
    detail: "Asesoría, capacitación técnica y digitalización con POS y gestión inventarios.",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
        <rect x="10" y="30" width="28" height="10" rx="2" fill="none" stroke="#1f2c23" strokeWidth="2" />
        <rect x="14" y="10" width="20" height="14" rx="2" fill="none" stroke="#1f2c23" strokeWidth="2" />
        <path d="M7 26h34" stroke="#1f2c23" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Financiamiento a la medida",
    detail: "Microcrédito y capital de trabajo alineado con cada peldaño.",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
        <rect x="8" y="14" width="32" height="20" rx="4" fill="none" stroke="#1f2c23" strokeWidth="2" />
        <circle cx="18" cy="24" r="4" fill="none" stroke="#1f2c23" strokeWidth="2" />
        <path d="M8 20h32" stroke="#1f2c23" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Beneficios escalonados",
    detail: "Cada paso hacia la formalidad desbloquea apoyos concretos y crecientes.",
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
        <path d="M12 36V20h8v16m8 0V12h8v24" fill="none" stroke="#1f2c23" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 12h4v8h-4z" fill="none" stroke="#1f2c23" strokeWidth="2" />
      </svg>
    ),
  },
];

export const ProposalSection: React.FC = () => {
  const steps = [
    {
      id: "step-1",
      title: "Peldaño 1: Identificación y Diagnóstico",
      eyebrow: "Sin costo fiscal",
      body: (
        <>
          <p className="mb-4">
            El primer escalón no exige formalidad fiscal. Su propósito es identificar y conocer a los micronegocios.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm mb-4">
            <li><strong>Acción:</strong> Censo y diagnóstico de productividad gratuito realizado en la tienda.</li>
            <li><strong>Entrega:</strong> Reporte personalizado de ventas, márgenes, inventario y proveedores.</li>
            <li><strong>Resultado:</strong> Clasificación por perfil (Cuidadoras, Atrapados, Desalentados) para adaptar apoyos.</li>
          </ul>
          <p className="text-sm italic text-slate-500">
            “Conoce tu negocio” sin obligaciones tributarias: la puerta de entrada para quienes sí desean mejorar.
          </p>
        </>
      ),
    },
    {
      id: "step-2",
      title: "Peldaño 2: Escalamiento Productivo",
      eyebrow: "Formalidad Baja",
      body: (
        <>
          <p className="mb-4">
            Una vez diagnosticado, el negocio sube al segundo peldaño.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm mb-4">
            <li><strong>Requisito:</strong> RFC simplificado como identificación administrativa, sin carga fiscal mayor.</li>
            <li><strong>Módulos productivos:</strong> Gestión digital (POS e inventario), compras consolidadas, mejoras de exhibición.</li>
            <li><strong>Acompañamiento:</strong> Consultores ayudan a ejecutar el plan de mejora y a usar las herramientas.</li>
          </ul>
          <p className="text-sm">
            Aquí aparecen los primeros retornos: más ventas, mejores márgenes y menor merma.
          </p>
        </>
      ),
    },
    {
      id: "step-3",
      title: "Peldaño 3: Integración a Cadenas",
      eyebrow: "Formalidad Media",
      body: (
        <>
          <p className="mb-4">
            El punto donde el negocio empieza a formalizar a las personas.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm mb-4">
            <li><strong>Requisito:</strong> Alta del dueño en IMSS y, gradualmente, formalización del primer trabajador.</li>
            <li><strong>Beneficio clave:</strong> Acceso a red mayorista de ANTAD y aliados con logística compartida.</li>
            <li><strong>Impacto:</strong> Precios similares a los de grandes cadenas y mejor variedad de productos.</li>
          </ul>
          <p className="text-sm font-medium text-emerald-700">
            Rompemos la desventaja estructural de costos; ahora la formalidad conviene económicamente.
          </p>
        </>
      ),
    },
    {
      id: "step-4",
      title: "Peldaño 4: Formalidad Plena",
      eyebrow: "Meta Final",
      body: (
        <>
          <p className="mb-4">
            El negocio llega al peldaño de formalidad plena como resultado de su crecimiento.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm mb-4">
            <li><strong>Requisito:</strong> Cumplimiento fiscal completo (ISR/IVA) y seguridad social para el equipo.</li>
            <li><strong>Beneficios:</strong> Crédito bancario institucional, elegibilidad para licitaciones y reputación formal.</li>
            <li><strong>Soporte:</strong> Mentoría y financiamiento puente para consolidar el salto.</li>
          </ul>
          <p className="text-sm">
            Después de crecer y profesionalizarse, la formalidad plena se siente natural, no punitiva.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Bloque A: Intro */}
      <Section id="proposal-intro" tone="plain" layout="full" className="proposal-intro">
        <div>
          <p className="eyebrow">La Propuesta</p>
          <h2 className="section-title">Hacia la formalización: la estrategia Escalera Comercial</h2>
          <p className="section-lead">
            Todo el diagnóstico previo —costos, geografía, perfiles y modelo predictivo— desemboca en una estrategia simple: primero hacemos rentable crecer y luego formalizarse ocurre solo.
          </p>
          <p>
            Abandonamos la lógica punitiva y pasamos a un enfoque de desarrollo productivo escalonado pensado para el micro-comercio urbano. Elevamos productividad, los integramos a cadenas y la formalidad llega como consecuencia natural.
          </p>
        </div>

        <div className="stat-cards">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="stat-card">
              <div className="stat-card__icon" aria-hidden="true">{pillar.icon}</div>
              <p className="stat-card__label">{pillar.title}</p>
              <p>{pillar.detail}</p>
            </article>
          ))}
        </div>

        <div className="intro-note" style={{ textAlign: "center" }}>
          <p>
            La formalidad deja de ser requisito de entrada. La Escalera Comercial premia cada paso con beneficios tangibles: diagnóstico gratuito, digitalización, integración mayorista y, al final, crédito e institucionalización.
          </p>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem", alignItems: "center" }}>
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
              <g stroke="#4d7248" strokeWidth="3" strokeLinecap="round">
                <line x1="16" y1="50" x2="16" y2="14" />
                <line x1="32" y1="50" x2="32" y2="22" />
                <line x1="48" y1="50" x2="48" y2="30" />
                <line x1="16" y1="42" x2="32" y2="42" />
                <line x1="32" y1="34" x2="48" y2="34" />
                <line x1="16" y1="50" x2="48" y2="50" />
              </g>
            </svg>
            <span>Escalera Comercial = formalidad como consecuencia, no condición.</span>
          </div>
        </div>
      </Section>

      {/* Bloque B: Escalera Interactiva */}
      <ScrollSection
        id="proposal-ladder"
        title="La Escalera Comercial"
        lead="Cada peldaño activa beneficios y requisitos graduales. Mantenemos la escalera completa siempre visible para que el comerciante entienda hacia dónde va."
        eyebrow="Estrategia"
        steps={steps}
        renderGraphic={(activeStepId) => (
          <CommercialLadderChart activeStepId={activeStepId} />
        )}
        background="muted"
      />

      {/* Bloque C: Arquitectura Institucional */}
      <Section id="proposal-architecture" tone="plain">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <InstitutionalArchitectureDiagram />
          </div>
        </div>

        {/* Ruta de Acción Timeline */}
        <div className="mt-20 max-w-3xl mx-auto">
            <div>
              <p className="eyebrow text-emerald-600">Implementación</p>
              <h2 className="section-title mb-6">Arquitectura Institucional</h2>
              <p className="mb-4 text-lg text-slate-700">
                La implementación requiere colaboración, pero con una arquitectura sencilla.
              </p>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-bold">1.</span>
                  <span><strong>Economía</strong> coordina y financia.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-bold">2.</span>
                  <span><strong>ANTAD</strong> ofrece la plataforma comercial y logística.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-bold">3.</span>
                  <span><strong>SAT/IMSS</strong> facilitan una transición gradual, no punitiva.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-bold">4.</span>
                  <span><strong>INEGI</strong> identifica territorios objetivo y mide resultados.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-bold">5.</span>
                  <span><strong>Universidades y consultoras</strong> levantan diagnósticos y operan la capacitación en campo.</span>
                </li>
              </ul>
            </div>
            <h3 className="text-xl font-bold text-center mb-10">Ruta de Acción</h3>
            <div className="timeline">
              {[
                {
                  title: "Etapa 1 · Identificación y convocatoria",
                  detail:
                    "Censos Económicos, ENOE y ENAPROCE mapean zonas calientes. Promotores territoriales visitan y convocan negocios dispuestos, con claridad de que es un programa para quienes quieren crecer.",
                },
                {
                  title: "Etapa 2 · Diagnóstico en tienda",
                  detail:
                    "Consultores levantan diagnóstico integral en la propia tienda: ventas, márgenes, inventarios, proveedores, manejo de efectivo y perfiles del dueño/cuidadoras.",
                },
                {
                  title: "Etapa 3 · Intervención productiva",
                  detail:
                    "Se ejecutan los módulos: gestión digital (POS), compras consolidadas con ANTAD y mejoras de exhibición/infrestructura. Los negocios comienzan a ver retornos.",
                },
                {
                  title: "Etapa 4 · Formalización gradual y seguimiento",
                  detail:
                    "RFC simplificado → IMSS dueño → primer trabajador formal → facturación regular. Cada paso activa beneficios y se monitorea durante 1-2 años para decidir escalamiento.",
                },
              ].map((stage) => (
                <article key={stage.title} className="timeline__item">
                  <div className="timeline__marker" aria-hidden="true" />
                  <h4>{stage.title}</h4>
                  <p>{stage.detail}</p>
                </article>
              ))}
            </div>
        </div>
      </Section>


    </>
  );
};
