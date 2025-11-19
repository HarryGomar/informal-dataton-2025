import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  kicker?: string;
  alignment?: "left" | "right" | "center";
  intro?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  kicker,
  alignment = "left",
  intro,
}) => {
  return (
    <header className={`section-header section-header--${alignment}`}>
      {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
      <div className="section-header__title-group">
        <h2>{title}</h2>
        {kicker && <p className="section-header__kicker">{kicker}</p>}
      </div>
      {intro && <div className="section-header__intro">{intro}</div>}
      <span className="horizontal-rule" aria-hidden />
    </header>
  );
};
