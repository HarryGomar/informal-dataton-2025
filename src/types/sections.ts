import type { ReactNode } from "react";

export interface ScrollStepConfig {
  id: string;
  eyebrow?: string;
  title: string;
  body: ReactNode;
  footnote?: string;
}
