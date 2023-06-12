/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        "logo-header-clamp": "clamp(200px, 80vw, 300px)",
        "hero-clamp": "clamp(340px, 40vw, 500px)",
      },
      fontFamily: {
        montserrat: "font-family: 'Montserrat', sans-serif",
        "sans-serif": "font-family: 'Open Sans', sans-serif",
      },
      fontSize: {
        "clamp-sm": "clamp(18px, 5vw, 20px)",
        "clamp-md": "clamp(20px, 6vw, 26px)",
        "clamp-lg": "clamp(24px, 8vw, 32px)",
      },
      dropShadow: {
        custom: "1px 1px 2px #000",
      },
      colors: {
        "just-black": "#000",
        "just-white": "#fff",
        "main-button": "#F13030",
        // Light Mode
        "blue-light": "#479EF9",
        // Dark Mode
        "blue-dark": "#0779F1",
      },
      backgroundImage: (theme) => ({
        "gradient-radial": `radial-gradient(${theme(
          "colors.blue.500"
        )} 0%, ${theme("colors.blue.700")} 100%)`,
        "gradient-linear": `linear-gradient(0deg, ${theme(
          "colors.blue.500"
        )} 0%, ${theme("colors.blue.700")} 100%)`,
      }),
    },
  },
  variants: {},
  plugins: [],
};
