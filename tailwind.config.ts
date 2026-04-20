import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand — constant in both themes
        terracotta: "#ce6355",
        coral: "#eb9084",
        // Surfaces — reference CSS vars so dark mode updates automatically
        // NOTE: using CSS var references means opacity modifiers (e.g. bg-bg/50)
        // won't work on these tokens; use inline styles for opacity variants.
        bg:           "var(--color-bg)",
        ivory:        "#faf9f5", // kept as hex — also used as text-ivory on dark surfaces
        "warm-sand":  "var(--color-warm-sand)",
        // Dark surfaces — constant (already dark in both themes)
        "dark-surface": "#30302e",
        "near-black":   "#141413",
        // Text
        "charcoal-warm": "#4d4c48",
        "olive-gray":    "#5e5d59",
        "stone-gray":    "#87867f",
        "dark-warm":     "#3d3d3a",
        "warm-silver":   "#b0aea5",
        // Borders
        "border-cream": "#f0eee6",
        "border-warm":  "#e8e6dc",
        "ring-warm":    "#d1cfc5",
        "ring-deep":    "#c2c0b6",
      },
      fontFamily: {
        serif: ["'Cormorant'", "Georgia", "serif"],
        sans: ["'IBM Plex Sans'", "Arial", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        ring: "0px 0px 0px 1px #f0eee6",
        "ring-warm": "0px 0px 0px 1px #d1cfc5",
        "ring-deep": "0px 0px 0px 1px #c2c0b6",
        whisper: "rgba(0,0,0,0.05) 0px 4px 24px",
        card: "0px 0px 0px 1px #f0eee6, rgba(0,0,0,0.04) 0px 2px 8px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
