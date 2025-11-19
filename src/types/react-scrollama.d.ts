declare module "react-scrollama" {
  import * as React from "react";

  interface ScrollamaStepEnterArgs<T = any> {
    data: T;
    entry?: IntersectionObserverEntry;
    direction?: "up" | "down";
  }

  interface ScrollamaStepExitArgs<T = any> extends ScrollamaStepEnterArgs<T> {
    scrollDirection?: "up" | "down";
  }

  interface ScrollamaProps<T = any> {
    offset?: number;
    debug?: boolean;
    progress?: boolean;
    threshold?: number;
    onStepEnter?: (args: ScrollamaStepEnterArgs<T>) => void;
    onStepExit?: (args: ScrollamaStepExitArgs<T>) => void;
    onStepProgress?: (args: ScrollamaStepEnterArgs<T> & { progress: number }) => void;
    children?: React.ReactNode;
  }

  export const Scrollama: React.FC<ScrollamaProps>;

  interface StepProps<T = any> {
    data?: T;
    children?: React.ReactNode;
    onStepEnter?: (args: ScrollamaStepEnterArgs<T>) => void;
    onStepExit?: (args: ScrollamaStepExitArgs<T>) => void;
    onStepProgress?: (args: ScrollamaStepEnterArgs<T> & { progress: number }) => void;
  }

  export const Step: React.FC<StepProps>;
}
