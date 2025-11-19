import React from "react";

export type SectionTone = "plain" | "muted" | "brand";
export type SectionLayout = "split-left" | "split-right" | "center" | "full";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  layout?: SectionLayout;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  tone = "plain",
  layout = "split-left",
  className = "",
  children,
}) => {
  const sectionClass = [
    "section",
    `section--${tone}`,
    `section--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClass}>
      <div className="section__inner">{children}</div>
    </section>
  );
};
