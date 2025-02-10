/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_pink: "#EE50A4",
        primary_blue: "#386CAA",
        bg_gray: "#f7f7f7",
        dark: "#373737",
        danger: "#CD3336",
        success: "#007F6D",
        // warning: "#CD3336",
      },
      animation: {
        bounce: "bounce 1.5s ease-in-out infinite",
        fadeInScaleUp: "fadeInScaleUp 0.3s ease-out",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-0.75rem)" },
        },
        fadeInScaleUp: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
