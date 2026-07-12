import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#030712",
        surface: "#08111f",
        ink: {
          950: "#f8fafc",
          700: "#cbd5e1",
        },
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          500: "#22d3ee",
          600: "#0891b2",
          700: "#0e7490",
        },
      },
      spacing: {
        18: "4.5rem",
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        14: "0.14",
        15: "0.15",
        18: "0.18",
        22: "0.22",
        35: "0.35",
        72: "0.72",
      },
      borderRadius: {
        card: "0.5rem",
      },
      boxShadow: {
        card: "0 18px 70px rgba(0, 0, 0, 0.24)",
        lift: "0 28px 90px rgba(34, 211, 238, 0.16), 0 18px 50px rgba(0, 0, 0, 0.34)",
        panel: "0 24px 90px rgba(8, 13, 30, 0.42)",
        neon: "0 0 34px rgba(34, 211, 238, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
