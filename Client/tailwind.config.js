/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFF",
      "sky-blue": "#A9CBF0",
      "light-blue": "#7CB1E7",
      "main-blue": "#3579D8",
      "main-gray": "#F2F2F2",
      "dark-gray": "#DDDDDD",
      "text-gray": "#808080",
      "bg-gray": "#f5f7fb",
      "icon-gray": "#6F7178",
      green: "#28c192",
      "dark-green": "#24ad83",
      red: "#F06045",
      "dark-red": "#d8563e",
    },
    screens: {
      customMd: "800px",
    },
  },
  plugins: [],
};
