import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./global.css";
import { CartProvider } from "../components/CartContext";
import CartDrawer from "../components/CartDrawer";
import { Analytics } from "@vercel/analytics/next";

const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-fraunces",
    style: ["normal", "italic"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Gloa — Ton glow, sans exploser ton budget",
    description:
        "Beauté, cheveux, skincare : des produits sélectionnés à prix doux pour ta routine glow.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={`${fraunces.variable} ${manrope.variable} font-body antialiased`}>
                <CartProvider>
                    {children}
                    <CartDrawer />
                </CartProvider>
            </body>
        </html>
    );
}