// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",       // Indigo
        background: "#0f172a",    // Dark blue-gray
        card: "#1e1e1e",          // Slate-dark (matching Home)
        glow: "#6366f1",          // Indigo glow
      },
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 15px rgba(0, 0, 0, 0.2)",
        glow: "0 0 15px rgba(99, 102, 241, 0.6)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
