import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f5f7fb",
        surface: "#ffffff",
        ink: {
          950: "#101828",
          700: "#344054",
        },
        brand: {
          50: "#eef4ff",
          100: "#dbeafe",
          500: "#3769e8",
          600: "#2854cd",
          700: "#2347aa",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 10px 28px rgba(16, 24, 40, 0.04)",
        lift: "0 1px 3px rgba(16, 24, 40, 0.06), 0 18px 40px rgba(16, 24, 40, 0.08)",
        panel: "0 20px 60px rgba(39, 67, 130, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
