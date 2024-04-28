/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1796E3",
        alert: "#F32626",
        title: "#101010",
        subtitle: "#373D3F",
        success: "#519330",
        warning: "#F59A31",
        "purple-cs": "#4A3093",
      },
      fontFamily: {
        manrofe: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
