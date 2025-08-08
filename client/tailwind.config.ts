import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          100: "#ffffff",
          200: "#eeeeee",
          300: "#dbdbdb",
          content: "#232446",
        },
        primary: {
          DEFAULT: "#2e63ff",
          content: "#ffffff",
        },
        container: {
          DEFAULT: "#ffffff",
          dark: "#1F1F21",
        },
        text: {
          DEFAULT: "#000000",
          dark: "#ffffff",
          muted: "#6b7280",
          muted_dark: "#d1d5db",
        },
        icon: {
          DEFAULT: "#4b5563",
          dark: "#f3f4f6",
        },
        border: {
          DEFAULT: "#e5e7eb",
          dark: "#374151",
        },
        menu_hover: {
          DEFAULT: "#f3f4f6",
          dark: "#1f2937",
        },
        secondary: {
          DEFAULT: "#6f75a5",
          content: "#ffffff",
        },
        accent: {
          DEFAULT: "#30b4dc",
          content: "#ffffff",
        },
        neutral: {
          DEFAULT: "#000000",
          content: "#ffffff",
        },
        info: {
          DEFAULT: "#438eff",
          content: "#ffffff",
        },
        success: {
          DEFAULT: "#26ca73",
          content: "#ffffff",
        },
        warning: {
          DEFAULT: "#ffdf63",
          content: "#000000",
        },
        error: {
          DEFAULT: "#de4c27",
          content: "#ffffff",
        },
        backdrop: {
          DEFAULT: "rgba(0, 0, 0, 0.5)",
          dark: "rgba(255, 255, 255, 0.09)",
        },
        light: {
          DEFAULT: "#e5e7eb",
          dark: "#374151",
        },
      },
      borderRadius: {
        selector: "0.25rem",
        field: "0.25rem",
        box: "0.25rem",
      },
      spacing: {
        selector: "0.25rem",
        field: "0.25rem",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      fontFamily: {
        sans: [
          '"Charlie Display"',
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Ubuntu",
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
      keyframes: {
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeOutLeft: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeOutRight: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(100%)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-100%)" },
        },
        fadeInScaleAndRotateAntiClockwise: {
          "0%": { opacity: "0", transform: "scale(0.8) rotate(-30deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        fadeInScaleAndRotateClockwise: {
          "0%": { opacity: "0", transform: "scale(0.8) rotate(30deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        "fade-in-scale-rotate-anti-clock-wise":
          "fadeInScaleAndRotateAntiClockwise 0.5s ease-out forwards",
        "fade-in-scale-rotate-clock-wise":
          "fadeInScaleAndRotateClockwise 0.5s ease-out forwards",
        "fade-in-left": "fadeInLeft 0.2s ease-out forwards",
        "fade-out-left": "fadeOutLeft 0.2s ease-in forwards",
        "fade-in-right": "fadeInRight 0.2s ease-out forwards",
        "fade-out-right": "fadeOutRight 0.2s ease-in forwards",
        "fade-in-up": "fadeInUp 0.2s ease-out forwards",
        "fade-out-down": "fadeOutDown 0.2s ease-in forwards",
        "fade-in-down": "fadeInDown 0.2s ease-out forwards",
        "fade-out-up": "fadeOutUp 0.2s ease-in forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".animate-once": {
          "animation-iteration-count": "1",
        },
      });
    },
  ],
};

export default config;
