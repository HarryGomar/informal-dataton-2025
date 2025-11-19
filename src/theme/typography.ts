export const typography = {
  headings: "'Space Grotesk', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  body: "'Source Sans 3', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  sizes: {
    hero: "clamp(2.75rem, 6vw, 3.75rem)",
    headline: "clamp(2rem, 4vw, 3rem)",
    title: "1.75rem",
    body: "1.05rem",
    small: "0.9rem",
    caption: "0.78rem",
  },
  lineHeights: {
    compact: 1.2,
    snug: 1.35,
    default: 1.7,
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
} as const;
