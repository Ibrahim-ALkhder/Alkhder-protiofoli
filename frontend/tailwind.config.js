/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#F3F4F6",
        lightBgSecondary: "#ECF0F3",
        cardWhite: "#F9F9F9",
        textPrimary: "#1F2937",
        textSecondary: "#6B7280",
        darkBg: "#0B0B0B",
        darkBgSoft: "#111111",
        darkCard: "#161616",
        darkBorder: "#222222",
        darkTextMuted: "#9CA3AF",
        softBlue: "#8FB7FF",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.08)",
        neumorph:
          "18px 18px 30px #D1D9E6, -18px -18px 30px rgba(255,255,255,0.95)",
        neumorphInset:
          "inset 10px 10px 18px #D1D9E6, inset -10px -10px 18px rgba(255,255,255,0.95)",
        darkGlow: "0 10px 40px rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(255,255,255,0.35), transparent 30%)",
        "section-fade":
          "linear-gradient(to bottom, #F3F4F6 0%, #d7dbe1 12%, #1a1a1a 30%, #0B0B0B 100%)",
        "section-return":
          "linear-gradient(to bottom, #0B0B0B 0%, #1a1a1a 16%, #d7dbe1 42%, #ECF0F3 100%)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-10%)" },
          "20%": { transform: "translate(-15%,5%)" },
          "30%": { transform: "translate(7%,-25%)" },
          "40%": { transform: "translate(-5%,25%)" },
          "50%": { transform: "translate(-15%,10%)" },
          "60%": { transform: "translate(15%,0%)" },
          "70%": { transform: "translate(0%,15%)" },
          "80%": { transform: "translate(3%,35%)" },
          "90%": { transform: "translate(-10%,10%)" }
        }
      }
    },
  },
  plugins: [],
};