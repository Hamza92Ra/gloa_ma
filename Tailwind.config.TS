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
                "glow-ring":
                    "conic-gradient(from 0deg, #F0D9A0, #C6952C, #F6E9DC, #C6952C, #F0D9A0)",
                "gold-sweep":
                    "linear-gradient(100deg, #9C7420 20%, #F0D9A0 40%, #C6952C 60%, #9C7420 80%)",
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
            },
            animation: {
                "spin-slow": "spin-slow 18s linear infinite",
                "spin-slower": "spin-slow 32s linear infinite reverse",
                shimmer: "shimmer 3.5s linear infinite",
                float: "float 6s ease-in-out infinite",
            },
            borderRadius: {
                blob: "63% 37% 54% 46% / 55% 48% 52% 45%",
            },
        },
    },
    plugins: [],
};

export default config;