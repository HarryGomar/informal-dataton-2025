import React from "react";
import { Section } from "../layout/Section";
import { SectionHeader } from "../layout/SectionHeader";



const guidingQuestions = [
  "¿Cuál es el tamaño de la economía informal en el comercio?",
  "¿Qué impactos tiene sobre recaudación, seguridad social y derrama económica?",
  "¿Qué políticas pueden activar la transición hacia la formalidad?",
];

export const IntroOverviewSection: React.FC = () => {
  return (
    <Section id="intro" tone="muted" layout="full">
      <SectionHeader
        alignment="center"
        eyebrow="Sección 0"
        title="Informalidad en el comercio: un recorrido basado en datos"
        kicker="Durante casi dos décadas, la informalidad comercial se ha mantenido elevada. Esta narrativa la cuantifica y descompone desde ángulos fiscal, social y productivo."
      />

        <div className="intro-grid__text">
          <p>
            La informalidad frena el crecimiento y limita el bienestar, pero no ha cedido pese a múltiples reformas.
            Casi la mitad de las unidades económicas informales del país (47.9%) pertenecen al comercio. En este
            recorrido combinamos datos del INEGI, SAT, IMSS, INFONAVIT y fuentes privadas para dimensionar la
            magnitud del fenómeno y sus costos.
          </p>
          <p>
            Cada sección alterna perspectivas: tamaño de la economía informal, impactos en recaudación, seguridad social,
            productividad y spillovers. Integramos mapas interactivos, modelos de ML y evidencia econométrica para sustentar
            los hallazgos.
          </p>
          <div className="intro-note">
            Encontrará scrollytelling, hojas de balance y tarjetas interactivas alineadas al lenguaje visual del deck de referencia.
          </div>
        </div>

      <div className="intro-questions-card">
        <p className="eyebrow">Preguntas guía del Datatón</p>
        <ul>
          {guidingQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>

    </Section>
  );
};
