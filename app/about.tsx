"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Wallet, Leaf } from "lucide-react";

const points = [
    {
        icon: Sparkles,
        title: "Sélection exigeante",
        text: "Chaque produit est testé et choisi pour son efficacité réelle, pas pour son packaging.",
    },
    {
        icon: Wallet,
        title: "Prix doux, toujours",
        text: "Le glow ne devrait jamais coûter un salaire. On négocie pour vous.",
    },
    {
        icon: Leaf,
        title: "Pensé pour ta peau",
        text: "Des formules adaptées aux besoins réels : hydratation, éclat, cheveux en santé.",
    },
];

export default function About() {
    return (
        <section id="histoire" className="bg-nude-100/60 py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-blob shadow-xl shadow-mocha/10 md:mx-0 mx-auto"
                >
                    {/* ─────────────────────────────────────
              📸 Remplacez /public/about.jpg par une photo
              qui raconte votre histoire (atelier, produits, équipe...)
             ───────────────────────────────────── */}
                    <Image
                        src="/about.jpg"
                        alt="L'univers Gloa"
                        fill
                        sizes="(max-width: 768px) 90vw, 480px"
                        className="object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                        Notre histoire
                    </p>
                    <h2 className="font-display text-3xl italic text-mocha sm:text-4xl">
                        Le glow accessible, c&apos;est possible
                    </h2>
                    <p className="mt-5 text-sm leading-relaxed text-mocha/65">
                        Gloa est née d&apos;un constat simple : les meilleurs produits
                        beauté sont souvent hors de prix. On a décidé de changer ça —
                        en sélectionnant des essentiels skincare, cheveux et beauté qui
                        tiennent leurs promesses, sans le prix qui va avec.
                    </p>

                    <div className="mt-9 space-y-6">
                        {points.map((point) => (
                            <div key={point.title} className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                                    <point.icon size={18} strokeWidth={1.75} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-mocha">
                                        {point.title}
                                    </h3>
                                    <p className="mt-1 text-sm leading-relaxed text-mocha/60">
                                        {point.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}