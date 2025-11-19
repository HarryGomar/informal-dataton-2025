import React from "react";

interface DiagramNode {
  id: string;
  title: string;
  detail: string;
  x: number;
  y: number;
  variant?: "primary" | "secondary" | "neutral";
}

const nodes: DiagramNode[] = [
  {
    id: "economia",
    title: "Secretaría de Economía",
    detail: "Eje rector · financiamiento · coordinación",
    x: 50,
    y: 48,
    variant: "primary"
  },
  {
    id: "antad",
    title: "ANTAD / Sector privado",
    detail: "Logística · precios mayoristas · mentoría",
    x: 18,
    y: 75,
    variant: "secondary"
  },
  {
    id: "sat",
    title: "SAT + IMSS",
    detail: "Ventanilla única · regímenes suaves",
    x: 82,
    y: 75,
    variant: "secondary"
  },
  {
    id: "inegi",
    title: "INEGI",
    detail: "Inteligencia territorial · monitoreo",
    x: 18,
    y: 25,
    variant: "neutral"
  },
  {
    id: "academia",
    title: "Universidades + consultoras",
    detail: "Diagnósticos · capacitación en campo",
    x: 82,
    y: 25,
    variant: "neutral"
  }
];

const nodeMap = nodes.reduce<Record<string, DiagramNode>>((acc, node) => {
  acc[node.id] = node;
  return acc;
}, {});

const links = [
  { from: "economia", to: "antad" },
  { from: "economia", to: "sat" },
  { from: "economia", to: "inegi" },
  { from: "economia", to: "academia" },
  { from: "inegi", to: "antad" },
  { from: "inegi", to: "sat" },
  { from: "inegi", to: "academia" }
];

export const InstitutionalArchitectureDiagram: React.FC = () => {
  return (
    <div className="architecture-diagram" aria-label="Diagrama de coordinación institucional">
      <svg className="architecture-diagram__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(77,114,72,0.8)" />
          </marker>
        </defs>
        {links.map((link) => {
          const from = nodeMap[link.from];
          const to = nodeMap[link.to];
          if (!from || !to) return null;
          return (
            <line
              key={`${link.from}-${link.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(77, 114, 72, 0.45)"
              strokeWidth={1.4}
              strokeDasharray="4 3"
              markerEnd="url(#arrow)"
            />
          );
        })}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.id}
          className={["architecture-node", node.variant ? `architecture-node--${node.variant}` : ""].join(" ")}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <p className="architecture-node__title">{node.title}</p>
          <p className="architecture-node__detail">{node.detail}</p>
        </div>
      ))}

      <div className="architecture-legend" aria-hidden="true">
        <span className="architecture-legend__item"><span className="dot dot--primary" /> Rectoría</span>
        <span className="architecture-legend__item"><span className="dot dot--secondary" /> Implementación</span>
        <span className="architecture-legend__item"><span className="dot dot--neutral" /> Inteligencia</span>
      </div>
    </div>
  );
};
