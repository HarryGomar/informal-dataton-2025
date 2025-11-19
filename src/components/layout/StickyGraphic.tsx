import React from "react";
import type { PropsWithChildren } from "react";

interface StickyGraphicProps extends PropsWithChildren {
  height?: string;
}

export const StickyGraphic: React.FC<StickyGraphicProps> = ({ children, height }) => {
  return (
    <div className="sticky-graphic" style={height ? { height } : undefined}>
      <div className="sticky-graphic__inner" style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
};
