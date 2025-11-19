import React, { useEffect, useState } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const { body } = document;
    if (!body) {
      return;
    }
    if (menuOpen) {
      body.classList.add("body-lock");
    } else {
      body.classList.remove("body-lock");
    }
    return () => body.classList.remove("body-lock");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${menuOpen ? " navbar--open" : ""}`}>
      <div className="navbar__inner">
        <a href="#intro" className="navbar__brand" onClick={closeMenu}>
          Informalidad Comercio
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="visually-hidden">{menuOpen ? "Cerrar menú" : "Abrir menú"}</span>
          <span aria-hidden className="navbar__toggle-line" />
          <span aria-hidden className="navbar__toggle-line" />
          <span aria-hidden className="navbar__toggle-line" />
        </button>
      </div>

      <nav id="site-nav" aria-label="Navegación principal" className={menuOpen ? "is-open" : ""}>
        <ul className="navbar__menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="navbar__link" onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
