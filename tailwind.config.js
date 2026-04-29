/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F6F1",
        ink: "#1F1F1F",
        muted: "#666666",
        accent: "#BFA173",
        danger: "#B42318",
        warning: "#B54708",
        success: "#027A48",
      },
      boxShadow: {
        soft: "0 20px 70px rgba(31, 31, 31, 0.08)",
      },
    },
  },
  plugins: [],
};
