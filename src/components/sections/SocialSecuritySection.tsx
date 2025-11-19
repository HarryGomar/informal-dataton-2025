import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";
import { SocialSecurityDonutChart } from "../charts/SocialSecurityDonutChart";
import { socialSecurityImpact } from "../../data/costs";
import { Section } from "../layout/Section";
import { SectionHeader } from "../layout/SectionHeader";
import { IconHealth, IconHousing, IconPension } from "../icons/DeckIcons";

const steps: ScrollStepConfig[] = [
  {
    id: "overview",
    title: "Impacto en la seguridad social",
    body:
      "La informalidad priva a millones de trabajadores de servicios médicos, vivienda y ahorro para el retiro. El boquete financiero supera los 18 mil mdp al año.",
  },
  {
    id: "imss",
    title: "Cuotas IMSS patronales y obreras",
    body: `≈ ${(
      socialSecurityImpact.imssPatronal + socialSecurityImpact.imssObrera
    ).toLocaleString("es-MX")} mdp no ingresan al seguro social, lo que reduce la capacidad hospitalaria y la cobertura de riesgos.`,
  },
  {
    id: "infonavit",
    title: "INFONAVIT (vivienda)",
    body:
      "≈ 2,867 mdp que podrían financiar créditos de vivienda no se entregan porque los empleadores informales no aportan al fondo habitacional.",
  },
  {
    id: "pensions",
    title: "Pensiones (SAR/AFORE)",
    body:
      "≈ 3,107 mdp dejan de invertirse en las cuentas individuales de retiro, condenando a los trabajadores informales a una vejez sin respaldo.",
  },
];

const highlightMap: Record<string, "imss" | "infonavit" | "pensions" | null> = {
  overview: null,
  imss: "imss",
  infonavit: "infonavit",
  pensions: "pensions",
};

const socialTiles = [
  { id: "imss", label: "IMSS", amount: socialSecurityImpact.imssPatronal + socialSecurityImpact.imssObrera, icon: <IconHealth /> },
  { id: "pensions", label: "Pensiones", amount: socialSecurityImpact.pensions, icon: <IconPension /> },
  { id: "infonavit", label: "INFONAVIT", amount: socialSecurityImpact.infonavit, icon: <IconHousing /> },
];

export const SocialSecuritySection: React.FC = () => (
  <>
    <ScrollSection
      id="social-security"
      eyebrow="Paso 2.3"
      title="La crisis silenciosa en seguridad social"
      lead="Sin cuotas formales, el IMSS, INFONAVIT y las cuentas de pensiones pierden recursos esenciales. Resaltar cada tramo ayuda a dimensionar qué institución queda desfinanciada."
      steps={steps}
      background="light"
      renderGraphic={(activeStepId) => (
        <div className="scroll-graphic-stack">
          <SocialSecurityDonutChart highlight={highlightMap[activeStepId]} />
          <p className="scroll-graphic-caption">
            En total, el sistema pierde 18,845 mdp cada año por aportaciones que nunca llegan.
          </p>
        </div>
      )}
    />

    <Section tone="plain" layout="center">
      <SectionHeader
        alignment="center"
        eyebrow="Saldo pendiente"
        title="$18,845 mdp adeudados en seguridad social"
        kicker="Tres instituciones descapitalizadas cuando los comercios operan fuera del IMSS."
      />

      <div className="icon-stat-grid">
        {socialTiles.map((tile) => (
          <article className="icon-stat" key={tile.id}>
            <div className="icon-stat__icon" aria-hidden>
              {tile.icon}
            </div>
            <p>{tile.label}</p>
            <strong>${tile.amount.toLocaleString("es-MX")} mdp</strong>
          </article>
        ))}
      </div>
      <p className="icon-stat__caption">Fuente: estimaciones con datos del INEGI, IMSS e INFONAVIT, 2023.</p>
    </Section>
  </>
);
