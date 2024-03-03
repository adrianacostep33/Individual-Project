/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#bb7a63",
        primary2: "#ab6d57",
        secondary: "#d4a595",
        dark: "#8f5946",
        light: "#f0ded8",
        light2: "#e6d2c2",
        light3: "#faf5f2",
        bg_card: "#d6c0b1",
        text_dark: "#482f28",
        text_dark2: "#2f191a",
        err_color: "#982e1b",
      },
    },
  },
  plugins: [],
};
