import React from "react";

type DiagramVariant = "primary" | "secondary" | "neutral";
type DiagramPosition = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface DiagramNode {
  id: string;
  title: string;
  detail: string;
  badge: string;
  variant: DiagramVariant;
  position: DiagramPosition;
  align?: "left" | "center" | "right";
}

const nodes: DiagramNode[] = [
  {
    id: "inegi",
    title: "INEGI",
    detail: "Inteligencia territorial · monitoreo",
    badge: "Inteligencia",
    variant: "neutral",
    position: "top-left"
  },
  {
    id: "academia",
    title: "Universidades + consultoras",
    detail: "Diagnósticos · capacitación en campo",
    badge: "Capacitación",
    variant: "neutral",
    position: "top-right",
    align: "right"
  },
  {
    id: "economia",
    title: "Secretaría de Economía",
    detail: "Eje rector · financiamiento · coordinación",
    badge: "Rectoría",
    variant: "primary",
    position: "center",
    align: "center"
  },
  {
    id: "antad",
    title: "ANTAD / Sector privado",
    detail: "Logística · precios mayoristas · mentoría",
    badge: "Implementación",
    variant: "secondary",
    position: "bottom-left"
  },
  {
    id: "sat",
    title: "SAT + IMSS",
    detail: "Ventanilla única · regímenes suaves",
    badge: "Implementación",
    variant: "secondary",
    position: "bottom-right",
    align: "right"
  }
];

const legendItems: { label: string; variant: DiagramVariant }[] = [
  { label: "Rectoría", variant: "primary" },
  { label: "Implementación", variant: "secondary" },
  { label: "Inteligencia", variant: "neutral" }
];

const renderCard = (node: DiagramNode, extraClass?: string) => (
  <article
    key={node.id}
    data-align={node.align ?? "left"}
    className={["architecture-card", `architecture-card--${node.variant}`, extraClass].filter(Boolean).join(" ")}
  >
    <span className="architecture-card__badge">{node.badge}</span>
    <h4 className="architecture-card__title">{node.title}</h4>
    <p className="architecture-card__detail">{node.detail}</p>
  </article>
);

export const InstitutionalArchitectureDiagram: React.FC = () => {
  const hubNode = nodes.find((node) => node.position === "center");
  const topNodes = nodes.filter((node) => node.position.startsWith("top"));
  const bottomNodes = nodes.filter((node) => node.position.startsWith("bottom"));

  return (
    <div className="architecture-diagram" aria-label="Diagrama de coordinación institucional">
      <div className="architecture-diagram__halo" aria-hidden="true" />

      <div className="architecture-diagram__row architecture-diagram__row--top">
        {topNodes.map((node) => renderCard(node))}
      </div>

      <div className="architecture-diagram__bridge architecture-diagram__bridge--top" aria-hidden="true" />

      {hubNode && renderCard(hubNode, "architecture-card--hub")}

      <div className="architecture-diagram__bridge architecture-diagram__bridge--bottom" aria-hidden="true" />

      <div className="architecture-diagram__row architecture-diagram__row--bottom">
        {bottomNodes.map((node) => renderCard(node))}
      </div>

      <div className="architecture-legend" aria-hidden="true">
        {legendItems.map((item) => (
          <span key={item.label} className="architecture-legend__item">
            <span className={["dot", `dot--${item.variant}`].join(" ")} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};
