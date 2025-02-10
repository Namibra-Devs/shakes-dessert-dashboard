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
    },
  },
  plugins: [],
};
