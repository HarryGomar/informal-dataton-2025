import React from "react";
import { Section } from "../layout/Section";
import { SectionHeader } from "../layout/SectionHeader";
import { socialSecurityImpact } from "../../data/costs";
import { IconHealth, IconHousing, IconPension } from "../icons/DeckIcons";

const formatMillions = (value: number) =>
  value.toLocaleString("es-MX", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  });

const institutions = [
  {
    id: "imss",
    label: "IMSS",
    detail: "Cuotas patronales + obreras",
    amount: socialSecurityImpact.imssPatronal + socialSecurityImpact.imssObrera,
    icon: <IconHealth />,
  },
  {
    id: "pensions",
    label: "Pensiones",
    detail: "Nuevo esquema individual",
    amount: socialSecurityImpact.pensions,
    icon: <IconPension />,
  },
  {
    id: "infonavit",
    label: "INFONAVIT",
    detail: "Aportaciones a vivienda",
    amount: socialSecurityImpact.infonavit,
    icon: <IconHousing />,
  },
];

const calculationRows: Array<
  | { id: string; label: string; amount: number }
  | { id: string; label: "Cálculo"; note: string }
> = [
  { id: "imssPatronal", label: "Cuotas IMSS patronales", amount: socialSecurityImpact.imssPatronal },
  { id: "imssWorker", label: "Cuotas IMSS trabajador", amount: socialSecurityImpact.imssObrera },
  { id: "infonavit", label: "Aportaciones INFONAVIT", amount: socialSecurityImpact.infonavit },
  {
    id: "method-1",
    label: "Cálculo",
    note:
      "Las tres cifras anteriores surgen de la calculadora oficial tomando el salario mínimo por trabajador y multiplicándolo por el número de remunerados en cada subsector.",
  },
  {
    id: "pensions",
    label: "Aportaciones a pensiones (nuevo esquema)",
    amount: socialSecurityImpact.pensions,
  },
  {
    id: "method-2",
    label: "Cálculo",
    note:
      "La cifra de pensiones emplea los salarios promedios observados, el número de remunerados y la tasa promedio de contribución registrada en 2023.",
  },
];

const totalImpact =
  socialSecurityImpact.imssPatronal +
  socialSecurityImpact.imssObrera +
  socialSecurityImpact.infonavit +
  socialSecurityImpact.pensions;

export const SocialSecuritySection: React.FC = () => (
  <Section id="social-security" tone="plain" layout="full" className="social-security">
    <div className="social-security__hero">
      <SectionHeader
        alignment="center"
        eyebrow="Paso 2.3"
        title="Saldo pendiente de la seguridad social"
        kicker="Una sola escena limpia para dimensionar el boquete."
        intro={
          <p>
            La informalidad priva a los sistemas de salud, vivienda y retiro de recursos frescos en el
            preciso momento en el que más los necesitan. Esta lectura concentra la historia en un solo
            plano para mantener foco y claridad.
          </p>
        }
      />

      <div className="social-security__headline">
        <p className="social-security__eyebrow">Saldo pendiente anual</p>
        <strong>${formatMillions(Math.round(totalImpact))} mdp</strong>
        <p>
          Recursos que deberían financiar servicios médicos, vivienda social y retiro digno, pero se
          pierden cuando los comercios operan fuera del IMSS.
        </p>
      </div>
    </div>

    <div className="social-security__metrics" aria-label="Desglose por institución">
      {institutions.map((institution) => (
        <article className="social-security__metric" key={institution.id}>
          <div className="social-security__metric-label">
            <span className="social-security__metric-icon" aria-hidden>
              {institution.icon}
            </span>
            <div>
              <p>{institution.label}</p>
              <small>{institution.detail}</small>
            </div>
          </div>
          <strong>${formatMillions(institution.amount)} mdp</strong>
        </article>
      ))}
      <p className="social-security__source">Fuente: estimaciones con datos del INEGI, IMSS e INFONAVIT, 2023.</p>
    </div>

    <div className="social-security__calcs">
      <div className="social-security__calcs-header">
        <h3>Explicación de los cálculos</h3>
        <p>
          La informalidad también significa millones de mexicanos sin protección social —y sin
          contribuciones al sistema público que sostendrá las pensiones del futuro.
        </p>
      </div>

      <ul className="social-security__calc-list">
        {calculationRows.map((row) => (
          <li key={row.id} className={"amount" in row ? "calc-row" : "calc-row calc-row--note"}>
            {"amount" in row ? (
              <>
                <span>{row.label}</span>
                <strong>${formatMillions(row.amount)} mdp</strong>
              </>
            ) : (
              <>
                <span>{row.label}</span>
                <p>{row.note}</p>
              </>
            )}
          </li>
        ))}
      </ul>

      <p className="social-security__closing">
        Se pierde bienestar, se pierde envejecimiento digno, se pierde movilidad social.
      </p>
    </div>
  </Section>
);
