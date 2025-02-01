/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ["Jakarta", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#FFF7E6", // Very light orange
          200: "#FFEACC", // Light peach
          300: "#FFD199", // Soft pastel orange
          400: "#FFB866", // Warm golden orange
          500: "#FF8C00", // Vibrant primary orange
          600: "#E67A00", // Slightly darker orange
          700: "#B35900", // Deeper burnt orange
          800: "#8C4600", // Darker muted orange
          900: "#663300", // Dark brownish-orange
        },

        secondary: {
          100: "#E6F9F9", // Very light teal
          200: "#CFF2F2", // Soft pastel teal
          300: "#99E0E0", // Light teal
          400: "#66CDCD", // Muted teal
          500: "#33BABA", // Standard teal
          600: "#2DA3A3", // Slightly darker teal
          700: "#1F7373", // Deep teal
          800: "#165656", // Darker muted teal
          900: "#0D3A3A", // Very deep teal
        },
        
        success: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#38A169",
          600: "#2F855A",
          700: "#276749",
          800: "#22543D",
          900: "#1C4532",
        },
        danger: {
          100: "#FFF5F5",
          200: "#FED7D7",
          300: "#FEB2B2",
          400: "#FC8181",
          500: "#F56565",
          600: "#E53E3E",
          700: "#C53030",
          800: "#9B2C2C",
          900: "#742A2A",
        },
        warning: {
          100: "#FFFBEB",
          200: "#FEF3C7",
          300: "#FDE68A",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
        },
        general: {
          100: "#CED1DD",
          200: "#858585",
          300: "#EEEEEE",
          400: "#0CC25F",
          500: "#F6F8FA",
          600: "#E6F3FF",
          700: "#EBEBEB",
          800: "#ADADAD",
        },
      },
    },
  },
  plugins: [],
};