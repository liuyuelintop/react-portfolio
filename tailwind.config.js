/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // The palette lives in src/index.css as CSS variables so that the light
      // switch can change it; these names only point at it.
      colors: {
        paper: "var(--paper)",
        lift: "var(--lift)",
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        link: "var(--link)",
        rule: "var(--rule)",
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk"', '"Helvetica Neue"', "Arial", "sans-serif"],
        display: ["Archivo", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
