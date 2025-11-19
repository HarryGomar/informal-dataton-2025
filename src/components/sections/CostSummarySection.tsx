import React from "react";
import { costSummaryCards } from "../../data/costs";
import { Section } from "../layout/Section";
import { SectionHeader } from "../layout/SectionHeader";
import { MetricStrip } from "../layout/MetricStrip";
import { IconGraph, IconShield, IconTreasury } from "../icons/DeckIcons";

const iconMap: Record<string, React.ReactNode> = {
  fiscal: <IconTreasury />,
  social: <IconShield />,
  gdp: <IconGraph />,
};

export const CostSummarySection: React.FC = () => {
  return (
    <Section id="costos" tone="plain" layout="split-left">
      <div className="section__stack">
        <SectionHeader
          eyebrow="Paso 2.1"
          title="La informalidad en el comercio tiene un precio muy concreto"
          kicker="Tres magnitudes resumen el costo anual: recaudación que no llega, cuotas sociales que se pierden y derrama económica fuera del radar fiscal."
        />

        <p>
          Cada peso evadido es un peso menos para hospitales, escuelas y proyectos estratégicos. Por eso abrimos la lectura con
          una hoja de situación que cuantifica impuestos, cuotas y valor agregado informal del comercio.
        </p>
      </div>

      <div className="metric-strip-list" aria-live="polite">
        {costSummaryCards.map((card) => (
          <MetricStrip
            key={card.id}
            icon={iconMap[card.id]}
            label={card.subtitle}
            value={card.title}
            detail={`Estimado anual (${card.amount.toLocaleString("es-MX")} mdp)`}
          />
        ))}
      </div>
    </Section>
  );
};
