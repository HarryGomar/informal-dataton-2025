import React from "react";

const navItems = [
  { id: "intro", label: "Introducción" },
  { id: "hero", label: "Hero" },
  { id: "costos", label: "Costos" },
  { id: "geografia", label: "Geografía" },
  { id: "productividad", label: "Productividad" },
  { id: "competencia", label: "Competencia" },
  { id: "transition", label: "Transición" },
];

export const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <a href="#intro" className="navbar__brand">
        Informalidad Comercio
      </a>
      <nav aria-label="Navegación principal">
        <ul className="navbar__menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="navbar__link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
