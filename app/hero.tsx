"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20 bg-gradient-to-br from-[#faf6f1] to-[#f5ebe0] overflow-hidden">

            {/* Texte */}
            <div className="relative z-10 w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-light text-[#2c1810] leading-tight mb-4"
                >
                    Ton glow,<br />
                    <span className="italic text-[#c9a96e]">sans compromis</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base md:text-lg text-[#6b5b4f] mb-6 max-w-md mx-auto md:mx-0"
                >
                    La beauté naturelle, sublimée par la science.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="px-8 py-3 bg-[#2c1810] text-[#faf6f1] rounded-full font-medium hover:bg-[#c9a96e] transition-colors"
                >
                    Découvrir la collection
                </motion.button>
            </div>

            {/* Image — VISIBLE sur mobile (w-full) et desktop */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full md:w-1/2 h-[300px] md:h-[500px]"
            >
                <Image
                    src="/hero-visual.jpg"
                    alt="Produits Gloa"
                    fill
                    className="object-contain md:object-cover rounded-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </motion.div>
        </section>
    );
}   