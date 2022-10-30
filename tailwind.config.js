/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "winter",
      {
        car: {
          primary: "#2563eb",
          secondary: "#1d4ed8",
          accent: "#86198f",
          neutral: "#374151",
          "base-100": "#111827",
          info: "#38bdf8",
          success: "#4ade80",
          warning: "#facc15",
          error: "#f472b6",
        },
      },
    ],
  },
};
