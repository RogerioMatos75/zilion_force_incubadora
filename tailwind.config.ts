import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Luxury Tech
        black: "#000000",
        white: "#FFFFFF",
        "zilion-gold": {
          DEFAULT: "#D4AF37",
          light: "#F9DF74",
          dark: "#AA8C2C",
          50: "#FCF9E8",
          100: "#F9F3D1",
          200: "#F4E6A3",
          300: "#EFD975",
          400: "#EACC47",
          500: "#D4AF37", // Base
          600: "#AA8C2C",
          700: "#806921",
          800: "#554616",
          900: "#2B230B",
        },
        "zilion-silver": {
          DEFAULT: "#C0C0C0",
          light: "#E5E7EB",
          dark: "#A0A0A0",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #AA8C2C 0%, #D4AF37 50%, #F9DF74 100%)",
        "gradient-silver": "linear-gradient(135deg, #A0A0A0 0%, #C0C0C0 50%, #E5E7EB 100%)",
        "gradient-dark": "linear-gradient(to bottom, #000000, #111111)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
