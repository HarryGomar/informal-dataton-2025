import React from "react";

const badges = ["Mapas interactivos", "Narrativa scroll", "Estimaciones fiscales", "INEGI · ANTAD 2025"];

const credits = [
  "Proyecto para el Datatón INEGI–ANTAD 2025",
  "Equipo: Rafael Harry Gomar Dawson · Eduardo García · Mauricia Peña · Emilia Hernández · ITAM",
];

const heroMetrics = [
  { value: "52%", label: "del comercio minorista opera fuera del SAT" },
  { value: "$230 mil mdp", label: "potencial de recaudación anual perdido" },
  { value: "7 M", label: "personas sin seguridad social por informalidad" },
  { value: "15%", label: "brecha de productividad frente al sector formal" },
];

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__background" aria-hidden />
      <div className="hero__inner">
        <div className="hero__spine" aria-hidden />
        <div className="hero__grid">
          <div className="hero__content">
            <span className="horizontal-rule" aria-hidden />
            <p className="hero__eyebrow">El contexto inevitable</p>
            <h1>Informalidad en el comercio: el problema que México no ha logrado resolver</h1>
            <p className="hero__lead">
              Frena el crecimiento, limita el bienestar y erosiona las instituciones. Tras dos décadas de reformas
              fiscales, las tasas permanecen estáticas. Si conocemos el diagnóstico, ¿por qué falla la cura?
            </p>
            <p className="hero__meta">
              Desarrollamos una narrativa de datos que combina aprendizaje automático, evidencia econométrica y
              visualizaciones interactivas para dimensionar los costos fiscales, sociales y productivos de la
              informalidad en el comercio mexicano.
            </p>

            <div className="hero__badges">
              {badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>

          <div className="hero__signals" aria-label="Indicadores clave de informalidad">
            <p className="hero__signals-title">Por qué importa</p>
            <ul className="hero__metrics">
              {heroMetrics.map((metric) => (
                <li key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="hero__credits">
          {credits.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </footer>
      </div>
    </section>
  );
};
