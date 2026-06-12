import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4AF37",
          hover: "#B8962E",
          light: "#F0D78C",
          dark: "#8B7355",
          glow: "rgba(212, 175, 55, 0.4)",
        },
        background: {
          DEFAULT: "#000000",
          card: "#0D0D0D",
          elevated: "#141414",
          glass: "rgba(13, 13, 13, 0.6)",
        },
        border: {
          DEFAULT: "#1F1F1F",
          light: "#2A2A2A",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B3B3B3",
          muted: "#666666",
        },
        success: "#00FF88",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F0D78C",
          dark: "#B8962E",
          muted: "#8B7355",
          glow: "rgba(212, 175, 55, 0.35)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 40px rgba(212, 175, 55, 0.35)",
        "neon-sm": "0 0 20px rgba(212, 175, 55, 0.25)",
        "gold-glow": "0 0 32px rgba(212, 175, 55, 0.35), 0 0 64px rgba(212, 175, 55, 0.12)",
        "gold-glow-sm": "0 0 20px rgba(212, 175, 55, 0.25)",
        card: "0 8px 32px rgba(0, 0, 0, 0.6)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(212,175,55,0.12) 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 30px rgba(212, 175, 55, 0.2)" },
          "50%": { boxShadow: "0 0 50px rgba(212, 175, 55, 0.45)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
