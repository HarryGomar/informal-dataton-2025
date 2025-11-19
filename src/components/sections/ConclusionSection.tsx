import React from "react";
import { Section } from "../layout/Section";

const insightTakeaways = [
  {
    label: "Diagnóstico del pasado",
    title: "Fiscalizar primero y acompañar después apenas movió la tasa de informalidad 3–4 puntos en 25 años.",
    detail: "Sin productividad ni confianza, el incentivo dominante siguió siendo permanecer fuera del radar fiscal.",
  },
  {
    label: "Qué muestran los datos",
    title: "La informalidad comercial es exclusión productiva: micronegocios, mujeres cuidadoras y colonias con corrupción e inseguridad.",
    detail: "Los mapas, perfiles y modelos predictivos evidencian infraestructura insuficiente y servicios públicos débiles, no falta de voluntad.",
  },
  {
    label: "Hacia dónde vamos",
    title: "Escalera Comercial hace rentable crecer primero y formalizar después.",
    detail: "Cada peldaño entrega capacidades, integra a cadenas y suma beneficios antes de exigir obligaciones fiscales completas.",
  },
];

const structuralFindings = [
  {
    title: "Productividad como punto de partida",
    detail: "Los costos fiscales son asumibles sólo cuando existe escala, logística compartida y margen sano.",
  },
  {
    title: "Territorios que determinan la política",
    detail: "La informalidad florece donde la corrupción municipal, la inseguridad y la baja densidad bancaria expulsan a los comercios.",
  },
  {
    title: "Personas en el centro",
    detail: "Cuidadoras, Atrapados y Desalentados requieren acompañamientos distintos; un mismo programa perpetúa la brecha.",
  },
  {
    title: "Secuencia gradual de obligaciones",
    detail: "RFC simplificado → IMSS del dueño → primer trabajador formal → facturación regular; cada paso desbloquea nuevos beneficios.",
  },
];

const principleHighlights = [
  {
    title: "Capacidad fiscal sostenible",
    detail: "Recaudar ocurre cuando la utilidad neta por formalizarse es positiva y verificable.",
  },
  {
    title: "Protección social alcanzable",
    detail: "Los primeros registros en seguridad social se acompañan con subsidios temporales y soporte operativo.",
  },
  {
    title: "Mercado interno resiliente",
    detail: "La formalidad deja de ser un privilegio de grandes cadenas cuando el microcomercio comparte logística y compras.",
  },
];

const actionSteps = [
  "Cruzar Censos Económicos, ENOE y ENAPROCE para priorizar corredores comerciales donde Escalera tenga mayor retorno social.",
  "Ejecutar un piloto evaluable con ANTAD: diagnóstico en tienda, módulos productivos y monitoreo de formalización por peldaño.",
  "Modernizar la medición de informalidad en negocios dentro del hogar para ajustar incentivos y presupuestos en tiempo real.",
];

export const ConclusionSection: React.FC = () => {
  return (
    <Section id="conclusion" tone="brand" layout="full" className="text-white conclusion-section">
      <div className="conclusion-shell">
        <header className="conclusion__header">
          <p className="eyebrow text-emerald-200">Conclusión</p>
          <h2 className="section-title text-emerald-50 mb-6">Lo que aprendimos sobre la informalidad comercial</h2>
          <p className="conclusion__lead">
            La evidencia nos obligó a abandonar la narrativa de evasión deliberada. La informalidad comercial persiste porque el sistema no
            ofrece productividad, logística ni certidumbre institucional. Esta es la síntesis del recorrido analítico.
          </p>
        </header>

        <section className="insight-band">
          {insightTakeaways.map((insight) => (
            <article key={insight.label} className="insight-band__item">
              <p className="insight-band__label">{insight.label}</p>
              <h3>{insight.title}</h3>
              <p>{insight.detail}</p>
            </article>
          ))}
        </section>

        <section className="finding-columns">
          <div className="finding-columns__lead">
            <p className="eyebrow text-emerald-200">Hallazgos accionables</p>
            <h3>Cuatro certezas para diseñar política</h3>
            <p>
              Estas conclusiones cruzan modelos, mapas y estudios de caso. Son los principios que guían la Escalera Comercial y cualquier
              intervención pública que busque resultados medibles.
            </p>
          </div>
          <ul>
            {structuralFindings.map((finding, index) => (
              <li key={finding.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{finding.title}</h4>
                  <p>{finding.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="principles-strip">
          <div className="principles-strip__lead">
            <p className="eyebrow text-emerald-200">Principios de política</p>
            <h3>Qué debe garantizar la Escalera Comercial</h3>
          </div>
          <div className="principles-strip__items">
            {principleHighlights.map((principle) => (
              <article key={principle.title}>
                <h4>{principle.title}</h4>
                <p>{principle.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="action-row">
          <div>
            <p className="eyebrow text-emerald-200">Próximos pasos</p>
            <h3>Agenda inmediata</h3>
            <p>
              INEGI, ANTAD y los equipos estatales pueden activar un piloto controlado en cuestión de meses. La premisa es sencilla: crecer
              primero, formalizar después y medir cada peldaño.
            </p>
          </div>
          <ol>
            {actionSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <footer className="conclusion__footer">
          <div>
            <p>Proyecto desarrollado para el Datatón INEGI–ANTAD 2025.</p>
            <p>Equipo: Rafael Harry Gomar Dawson · Eduardo García · Mauricia Peña · Emilia Hernández · ITAM</p>
          </div>
          <p className="conclusion-footnote">Sólo si el piloto funciona, escalamos.</p>
        </footer>
      </div>
    </Section>
  );
};
