import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./data/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: "#FAF3EA",
                nude: {
                    100: "#F6E9DC",
                    200: "#EFDAC4",
                    300: "#E4C4A3",
                    400: "#D3A97C",
                },
                mocha: "#3A2B1E",
                gold: {
                    DEFAULT: "#C6952C",
                    light: "#F0D9A0",
                    dark: "#9C7420",
                },
                blush: "#F4E6DE",
            },
            fontFamily: {
                display: ["var(--font-fraunces)"],
                body: ["var(--font-manrope)"],
            },
            backgroundImage: {
                "glow-ring": "conic-gradient(from 0deg, #F0D9A0, #C6952C, #F6E9DC, #C6952C, #F0D9A0)",
                "gold-sweep": "linear-gradient(100deg, #9C7420 20%, #F0D9A0 40%, #C6952C 60%, #9C7420 80%)",
            },
            keyframes: {
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "200% 50%" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-14px)" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(60px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "slide-in-left": {
                    "0%": { opacity: "0", transform: "translateX(-60px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "blur-in": {
                    "0%": { opacity: "0", filter: "blur(10px)" },
                    "100%": { opacity: "1", filter: "blur(0)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(198,149,44,0.15)" },
                    "50%": { boxShadow: "0 0 40px rgba(198,149,44,0.35)" },
                },
            },
            animation: {
                "spin-slow": "spin-slow 18s linear infinite",
                "spin-slower": "spin-slow 32s linear infinite reverse",
                shimmer: "shimmer 3.5s linear infinite",
                float: "float 6s ease-in-out infinite",
                "fade-up": "fade-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
                "fade-in": "fade-in 0.6s ease-out forwards",
                "scale-in": "scale-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
                "slide-in-right": "slide-in-right 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
                "slide-in-left": "slide-in-left 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
                "blur-in": "blur-in 0.7s ease-out forwards",
                "pulse-glow": "pulseGlow 3s ease-in-out infinite",
            },
            borderRadius: {
                blob: "63% 37% 54% 46% / 55% 48% 52% 45%",
            },
        },
    },
    plugins: [],
};

export default config;