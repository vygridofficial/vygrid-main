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
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        editor: {
          bg: "#0A0A0A",
          panel: "#111111",
          card: "#1A1A1A",
          text: "#F5F0EB",
          muted: "#888888",
          dark: "#444444",
          accent: "#C8B89A",
          border: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        grotesque: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex)", "monospace"],
      },
      backgroundImage: {
        noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'marquee-slow': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-rev 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
