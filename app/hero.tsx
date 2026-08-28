"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function Hero() {
    return (
        <section
            id="accueil"
            className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 overflow-hidden px-6 pb-20 pt-36 md:flex-row md:gap-8 md:pb-32 md:pt-44"
        >
            {/* Texte */}
            <motion.div
                initial="hidden"
                animate="show"
                className="flex-1 text-center md:text-left"
            >
                <motion.p
                    variants={fadeUp}
                    custom={0}
                    className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark"
                >
                    Beauté · Cheveux · Skincare
                </motion.p>

                <motion.h1
                    variants={fadeUp}
                    custom={0.1}
                    className="font-display text-4xl italic leading-[1.08] text-mocha sm:text-5xl md:text-6xl"
                >
                    Ton <span className="shimmer-text animate-shimmer not-italic">glow</span>,
                    <br className="hidden md:block" /> sans exploser ton budget
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    custom={0.22}
                    className="mx-auto mt-6 max-w-md text-base leading-relaxed text-mocha/70 md:mx-0"
                >
                    Des produits skincare, cheveux et beauté sélectionnés avec soin,
                    pour une routine glow accessible — sans compromis sur la qualité.
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    custom={0.34}
                    className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start"
                >
                    <a
                        href="#produits"
                        className="rounded-full bg-mocha px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:scale-105 hover:shadow-lg hover:shadow-mocha/20"
                    >
                        Découvrir nos produits
                    </a>
                    <a
                        href="#waitlist"
                        className="rounded-full border border-mocha/20 px-7 py-3.5 text-sm font-semibold text-mocha transition-all hover:border-mocha/40 hover:bg-mocha/5"
                    >
                        Rejoindre la liste d&apos;attente
                    </a>
                </motion.div>
            </motion.div>

            {/* Image + anneau doré animé (élément signature) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-1 items-center justify-center"
            >
                <div className="relative aspect-square w-full max-w-sm">
                    {/* Anneau doré tournant */}
                    <div
                        aria-hidden
                        className="absolute -inset-6 rounded-full bg-glow-ring opacity-40 blur-2xl animate-spin-slow"
                    />
                    <div
                        aria-hidden
                        className="absolute -inset-2 rounded-full bg-glow-ring opacity-70 animate-spin-slower [mask-image:radial-gradient(closest-side,transparent_78%,black_82%)]"
                    />

                    {/* ─────────────────────────────────────────────
              📸 IMAGE HERO : remplacez /public/hero.jpg
              par une photo représentant votre niche
              (skincare / beauté), format carré de préférence
             ───────────────────────────────────────────── */}
                    <div className="absolute inset-3 animate-float overflow-hidden rounded-blob shadow-2xl shadow-mocha/20">
                        <Image
                            src="/hero.jpg"
                            alt="Univers skincare et beauté Gloa"
                            fill
                            priority
                            sizes="(max-width: 768px) 320px, 420px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}