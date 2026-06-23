import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          black: "var(--forest-black)",
          deep: "var(--deep-green)",
          moss: "var(--moss-green)",
        },
        trail: {
          gold: "var(--trail-gold)",
          soft: "var(--soft-gold)",
        },
        jungle: {
          emerald: "var(--emerald)",
          danger: "var(--muted-red)",
        },
      },
      fontFamily: {
        heading: ["Georgia", "Cambria", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        trail: "0 0 38px rgba(217, 180, 74, 0.18)",
        emerald: "0 0 34px rgba(139, 207, 136, 0.13)",
        warning: "0 0 34px rgba(185, 93, 64, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
