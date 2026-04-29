/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F6F1",
        cream: "#FFF8EF",
        card: "#FFFCF6",
        ink: "#1F1F1F",
        muted: "#666666",
        accent: "#BFA173",
        blush: "#FFB8B8",
        coral: "#FF6B5F",
        danger: "#D94A3D",
        warning: "#F5A623",
        success: "#2F9E5B",
        mint: "#DDF3E4",
        borderSoft: "#EEDFCC",
      },
      boxShadow: {
        soft: "0 20px 70px rgba(31, 31, 31, 0.08)",
      },
    },
  },
  plugins: [],
};
