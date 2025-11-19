import React, { useState } from "react";
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
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  title,
  lead,
  steps,
  renderGraphic,
  background = "default",
  eyebrow,
}) => {
  const [activeStepId, setActiveStepId] = useState(() => steps[0]?.id ?? "");

  const tone = background === "muted" ? "muted" : "plain";
  const layout = renderGraphic ? "split-left" : "full";

  return (
    <Section id={id} tone={tone} layout={layout} className="section--scrolly">
      <div className="scroll-section__text">
        <header className="scroll-section__header">
          <p className="eyebrow">{eyebrow ?? "Sección"}</p>
          <h2 className="section-title">{title}</h2>
          {lead && <p className="section-lead">{lead}</p>}
        </header>

        <Scrollama offset={0.5} onStepEnter={({ data }) => setActiveStepId(data)}>
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
