/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      minHeight: {
        layout: "calc(100vh - 96px)",
        "layout-mobile": "calc(100vh - 116px)",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
  daisyui: {
    themes: [
      {
        "car-service-book-light": {
          primary: "#d1d5db",
          secondary: "#e5e7eb",
          accent: "#111827",
          neutral: "#9ca3af",
          "base-100": "#f3f4f6",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#facc15",
          error: "#b91c1c",
        },
      },
      {
        "car-service-book-dark": {
          primary: "#2E364C",
          secondary: "#5A637E",
          accent: "#E4E6E5",
          neutral: "#232B3A",
          "base-100": "#13161F",
          info: "#7dd3fc",
          success: "#4ade80",
          warning: "#facc15",
          error: "#f87171",
        },
      },
    ],
    darkTheme: "car-service-book-dark",
  },
};
