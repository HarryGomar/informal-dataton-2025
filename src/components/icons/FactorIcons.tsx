import React from "react";

const baseProps = {
  width: 36,
  height: 36,
  viewBox: "0 0 36 36",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconEducation: React.FC = () => (
  <svg {...baseProps}>
    <path d="M4 14 18 7l14 7-14 7-14-7Z" />
    <path d="M8 17v7c0 2.5 4.5 5 10 5s10-2.5 10-5v-7" />
    <path d="M26 21c-2 1.4-4.6 2.1-8 2.1s-6-0.7-8-2.1" />
  </svg>
);

export const IconMicroenterprise: React.FC = () => (
  <svg {...baseProps}>
    <rect x="4.5" y="11" width="27" height="17" rx="2" />
    <path d="M9 28v-6h6v6" />
    <path d="M21 28v-6h6v6" />
    <path d="M4.5 16h27" />
  </svg>
);

export const IconInstitution: React.FC = () => (
  <svg {...baseProps}>
    <path d="M6 13h24" />
    <path d="M9 13v13" />
    <path d="M27 13v13" />
    <path d="M18 5 6 11h24L18 5Z" />
    <path d="M4 26h28" />
    <path d="M16 18h4" />
    <path d="M16 22h4" />
  </svg>
);

export const IconCareWork: React.FC = () => (
  <svg {...baseProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M4 28c0-4.4 3.6-8 8-8" />
    <path d="M32 23c-2-2.5-5-4-8-4s-6 1.5-8 4c2 2.5 5 4 8 4s6-1.5 8-4Z" />
    <path d="M28 17c-0.8 0-1.6 0.2-2.2 0.7-1.5 1.1-1.8 3.3-0.7 4.8" />
  </svg>
);
