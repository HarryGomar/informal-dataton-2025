import React, { useEffect, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import type { ScrollStepConfig } from "../../types/sections";
import { StickyGraphic } from "./StickyGraphic";
import { Section } from "./Section";

interface ScrollSectionProps {
  id: string;
  title: string;
  lead?: string;
  steps: ScrollStepConfig[];
  renderGraphic?: (activeStepId: string) => React.ReactNode;
  background?: "default" | "muted" | "light";
  eyebrow?: string;
  introContent?: React.ReactNode;
  onStepChange?: (stepId: string) => void;
  className?: string;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  title,
  lead,
  steps,
  renderGraphic,
  background = "default",
  eyebrow,
  introContent,
  onStepChange,
  className,
}) => {
  const [activeStepId, setActiveStepId] = useState(() => steps[0]?.id ?? "");
  const [scrollOffset, setScrollOffset] = useState(0.5);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const handleChange = () => setScrollOffset(mediaQuery.matches ? 0.8 : 0.5);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const tone = background === "muted" ? "muted" : "plain";
  const layout = renderGraphic ? "split-left" : "full";

  const handleStepEnter = ({ data }: { data: string }) => {
    setActiveStepId(data);
    onStepChange?.(data);
  };

  const sectionClassName = ["section--scrolly", className].filter(Boolean).join(" ");

  return (
    <Section id={id} tone={tone} layout={layout} className={sectionClassName}>
      <div className="scroll-section__text">
        <header className="scroll-section__header">
          <p className="eyebrow">{eyebrow ?? "Sección"}</p>
          <h2 className="section-title">{title}</h2>
          {lead && <p className="section-lead">{lead}</p>}
        </header>

        {introContent && <div className="scroll-section__intro">{introContent}</div>}

        <Scrollama offset={scrollOffset} onStepEnter={handleStepEnter}>
          {steps.map((step) => (
            <Step data={step.id} key={step.id}>
              <article
                className={"scroll-step" + (activeStepId === step.id ? " scroll-step--active" : "")}
              >
                {step.eyebrow && <p className="eyebrow">{step.eyebrow}</p>}
                <h3>{step.title}</h3>
                <div className="scroll-step__body">
                  {typeof step.body === "string" ? <p>{step.body}</p> : step.body}
                </div>
                {step.footnote && <small className="scroll-step__footnote">{step.footnote}</small>}
              </article>
            </Step>
          ))}
        </Scrollama>
      </div>

      {renderGraphic && (
        <div className="scroll-section__graphic">
          <StickyGraphic>{renderGraphic(activeStepId)}</StickyGraphic>
        </div>
      )}
    </Section>
  );
};
