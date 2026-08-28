"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// ─────────────────────────────────────────────
// 💬 Remplacez ces témoignages par de vrais avis
// clients dès que vous en aurez (DM Instagram,
// commentaires, etc.)
// ─────────────────────────────────────────────
const testimonials = [
    {
        name: "Sara",
        quote:
            "Ma peau n'a jamais été aussi hydratée. Et le prix reste raisonnable, ce qui change tout.",
        rating: 5,
    },
    {
        name: "Imane",
        quote:
            "Livraison rapide, produits qui sentent bon et qui fonctionnent vraiment. Je recommande.",
        rating: 5,
    },
    {
        name: "Yasmine",
        quote:
            "J'étais sceptique sur le rapport qualité-prix, mais honnêtement le résultat est là.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section id="avis" className="mx-auto max-w-6xl px-6 py-24">
            <div className="mb-14 text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    Elles ont testé
                </p>
                <h2 className="font-display text-3xl italic text-mocha sm:text-4xl">
                    Ce qu&apos;elles en disent
                </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-3xl bg-white/60 p-7 shadow-sm shadow-mocha/5 ring-1 ring-mocha/5"
                    >
                        <div className="mb-4 flex gap-1 text-gold">
                            {Array.from({ length: t.rating }).map((_, idx) => (
                                <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>
                        <p className="text-sm leading-relaxed text-mocha/70">
                            &ldquo;{t.quote}&rdquo;
                        </p>
                        <p className="mt-5 font-display text-sm italic text-mocha">
                            — {t.name}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}