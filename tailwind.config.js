import animatePlugin from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
      },
      animation: {
        "bounce-bar": "bounce-bar 1s infinite ease-in-out",
      },
      keyframes: {
        "bounce-bar": {
          "0%, 100%": { height: "10px", opacity: "0.3" },
          "50%": { height: "25px", opacity: "1" },
        },
      },
    },
  },
  plugins: [animatePlugin],
};
