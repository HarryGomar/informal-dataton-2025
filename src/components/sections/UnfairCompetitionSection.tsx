import React from "react";
import { Section } from "../layout/Section";
import { FormalVsInformalTfpChart } from "../charts/FormalVsInformalTfpChart";

export const UnfairCompetitionSection: React.FC = () => (
  <Section id="competencia" tone="muted" layout="split-left" className="unfair-competition">
    <div className="unfair-competition__content">
      <header className="section-header">
        <p className="section-header__eyebrow">Sección 5</p>
        <div className="section-header__title-group">
          <h2>Competencia desleal y efecto en empresas formales</h2>
        </div>
        <p className="section-header__kicker">
          Conectar la informalidad con la <strong>productividad de las firmas formales</strong> (–15% PTF).
        </p>
      </header>

      <div className="unfair-competition__body">
        <div className="unfair-competition__objective">
          <p className="unfair-competition__objective-label">Objetivo</p>
          <p>
            Conectar la informalidad con la pérdida sostenida de productividad de las empresas que sí cumplen con las reglas
            del juego.
          </p>
        </div>

        <div className="unfair-competition__narrative">
          <h3>Competencia desleal: cómo la informalidad frena a las empresas formales</h3>
          <p>
            La informalidad no solo afecta a quienes trabajan en ella, sino también a las empresas formales que compiten en un
            terreno desigual. Los negocios informales operan al margen de regulaciones e impuestos, evitando costos que las
            empresas formales sí asumen. El resultado: precios distorsionados, menor inversión y expansión limitada hacia zonas
            dominadas por lo informal.
          </p>
          <p>
            Un dato clave de un estudio del Banco Interamericano de Desarrollo muestra que enfrentar competencia informal reduce
            en alrededor de 15% la productividad total de factores (PTF) de las empresas formales. Es decir, cuando una empresa
            formal debe competir con muchos informales —que pueden vender más barato al no pagar impuestos ni cumplir normas
            laborales—, su eficiencia y rendimiento caen significativamente.
          </p>
          <p>
            Este rezago del 15% en productividad es enorme a nivel país. En suma, la informalidad crea una competencia desleal que
            frena a las empresas más productivas y termina afectando el crecimiento económico general.
          </p>
        </div>
      </div>
    </div>

    <div className="unfair-competition__visual">
      <FormalVsInformalTfpChart />
    </div>
  </Section>
);
