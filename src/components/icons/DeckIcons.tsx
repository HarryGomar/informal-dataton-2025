import React from "react";

const iconProps = {
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "none" as const,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const strokeColor = "currentColor";

export const IconTreasury: React.FC = () => (
  <svg {...iconProps}>
    <rect x="4" y="8" width="24" height="16" rx="4" stroke={strokeColor} />
    <path d="M10 14h12" stroke={strokeColor} />
    <path d="M10 18h12" stroke={strokeColor} />
    <circle cx="11" cy="11" r="2" stroke={strokeColor} />
  </svg>
);

export const IconShield: React.FC = () => (
  <svg {...iconProps}>
    <path d="M16 28s8-4 8-11V7l-8-3-8 3v10c0 7 8 11 8 11Z" stroke={strokeColor} />
    <path d="M16 12v6" stroke={strokeColor} />
    <path d="M13 15h6" stroke={strokeColor} />
  </svg>
);

export const IconGraph: React.FC = () => (
  <svg {...iconProps}>
    <path d="M6 22V10" stroke={strokeColor} />
    <path d="M12 22V6" stroke={strokeColor} />
    <path d="M18 22v-8" stroke={strokeColor} />
    <path d="M24 22v-4" stroke={strokeColor} />
    <path d="M5 22h22" stroke={strokeColor} />
  </svg>
);

export const IconHealth: React.FC = () => (
  <svg {...iconProps}>
    <path d="M16 6c-4 3-8 3-8 7 0 5 8 9 8 9s8-4 8-9c0-4-4-4-8-7Z" stroke={strokeColor} />
    <path d="M13 14h6" stroke={strokeColor} />
    <path d="M16 11v6" stroke={strokeColor} />
  </svg>
);

export const IconPension: React.FC = () => (
  <svg {...iconProps}>
    <rect x="6" y="12" width="20" height="12" rx="2" stroke={strokeColor} />
    <path d="M10 12V8a6 6 0 0 1 12 0v4" stroke={strokeColor} />
    <path d="M12 17h8" stroke={strokeColor} />
    <path d="M12 20h4" stroke={strokeColor} />
  </svg>
);

export const IconHousing: React.FC = () => (
  <svg {...iconProps}>
    <path d="M6 14 16 6l10 8" stroke={strokeColor} />
    <path d="M8 13v11h16V13" stroke={strokeColor} />
    <path d="M14 24v-6h4v6" stroke={strokeColor} />
  </svg>
);
