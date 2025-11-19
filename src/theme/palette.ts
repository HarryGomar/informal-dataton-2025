export const palette = {
  brand: "#4D7248",
  brandDark: "#1F2C23",
  brandLight: "#9CBC88",
  accentWarm: "#C3A86B",
  accentCoral: "#D27F6C",
  surfacePlain: "#FFFFFF",
  surfaceMuted: "#F4F1EB",
  background: "#FAF7F1",
  textPrimary: "#1E1F1A",
  textSecondary: "#4D4F49",
  borderSoft: "rgba(31, 44, 35, 0.08)",
  borderStrong: "rgba(31, 44, 35, 0.18)",
} as const;

export type PaletteColor = keyof typeof palette;
