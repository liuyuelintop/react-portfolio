/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
      },
      lineClamp: {
        3: "3",
      },
      backdropBlur: {
        sm: "4px",
      },
      blur: {
        project: "120px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        project: "0 20px 25px -5px rgba(168, 85, 247, 0.1)",
        contact: "0 10px 15px -3px rgba(168, 85, 247, 0.2)",
      },
      minHeight: {
        card: "480px",
      },
      gridAutoRows: {
        project: "minmax(480px, 1fr)",
      },
      gradientColorStops: {
        "purple-400": "#c084fc",
        "blue-400": "#60a5fa",
      },
    },
  },
  plugins: ["@tailwindcss/line-clamp"],
};
