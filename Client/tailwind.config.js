/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFF",
        "sky-blue": "#A9CBF0",
        "light-blue": "#7CB1E7",
        "main-blue": "#3579D8",
        "main-gray": "#F2F2F2",
        "dark-gray": "#DDDDDD",
        "text-gray": "#808080",
        "bg-gray": "#f5f7fb",
        "login-text-gray": "#a8aaaf",
        "login-bg-gray": "#36393f",
        "icon-gray": "#6F7178",
        "cont-gray": "#495057",
        "inputcom-bg": "#202225",
        green: "#28c192",
        "dark-green": "#24ad83",
        red: "#F06045",
        "dark-red": "#d8563e",
      },
      screens: {
        customMd: "800px",
      },
      spacing: {
        120: "30rem",
      },
    },
  },
  plugins: [],
};
