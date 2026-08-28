"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Sparkles, Star, ShoppingBag, ChevronLeft, ChevronRight, Instagram, Mail, MapPin } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { products } from "../data/Products";

/* ─── Animation Variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    })
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } }
};

/* ─── Magnetic Button Component ─── */
function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            whileTap={{ scale: 0.96 }}
        >
            {children}
        </motion.button>
    );
}

/* ─── Animated Section Wrapper ─── */
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── Product Card ─── */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
    return (
        <motion.div
            variants={fadeUp}
            custom={index}
            className="group relative bg-white/50 rounded-3xl p-4 overflow-hidden cursor-pointer"
            whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
        >
            {product.tag && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-gold text-cream rounded-full">
                    {product.tag}
                </span>
            )}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-nude-100 mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-mocha/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="w-full h-full bg-nude-200 flex items-center justify-center text-mocha/30 text-sm font-medium">
                    {product.image.replace("/products/", "")}
                </div>
                <motion.div
                    className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                />
                <div className="absolute bottom-4 right-4 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="w-12 h-12 rounded-full bg-mocha text-cream flex items-center justify-center shadow-lg">
                        <ShoppingBag size={18} />
                    </div>
                </div>
            </div>
            <h3 className="font-display text-lg font-medium text-mocha mb-1 group-hover:text-gold transition-colors duration-300">
                {product.name}
            </h3>
            <p className="text-sm text-mocha/60 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-2">
                <span className="font-semibold text-mocha text-lg">{product.price}</span>
                {product.oldPrice && (
                    <span className="text-sm text-mocha/40 line-through">{product.oldPrice}</span>
                )}
            </div>
        </motion.div>
    );
}

/* ─── Main Page ─── */
export default function Home() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false }, [
        Autoplay({ delay: 4000, stopOnInteraction: false })
    ]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    return (
        <main className="grain">
            {/* ─── Floating Orbs ─── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="orb absolute -top-40 -left-40 w-[500px] h-[500px] bg-gold/20" style={{ animationDelay: "0s" }} />
                <div className="orb absolute top-1/3 -right-40 w-[400px] h-[400px] bg-nude-300/30" style={{ animationDelay: "-4s" }} />
                <div className="orb absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-blush/40" style={{ animationDelay: "-8s" }} />
            </div>

            {/* ═══════════════════════════════════════
                NAVBAR
            ═══════════════════════════════════════ */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-0 left-0 right-0 z-50 glass"
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <motion.a
                        href="#"
                        className="font-display text-2xl font-semibold text-mocha tracking-tight"
                        whileHover={{ scale: 1.02 }}
                    >
                        Gloa
                    </motion.a>
                    <div className="hidden md:flex items-center gap-8">
                        {["Produits", "Routine", "Histoire", "Contact"].map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-mocha/70 hover:text-mocha transition-colors relative group"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i + 0.5 }}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>
                    <MagneticButton className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-mocha text-cream rounded-full text-sm font-medium hover:bg-gold transition-colors duration-300">
                        <ShoppingBag size={16} />
                        Panier
                    </MagneticButton>
                </div>
            </motion.nav>

            {/* ═══════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
                    className="relative z-10 max-w-7xl mx-auto px-6 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gold/20 mb-8"
                    >
                        <Sparkles size={14} className="text-gold" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-mocha/70">
                            Nouvelle Collection 2026
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="font-display text-6xl md:text-8xl lg:text-9xl font-medium text-mocha leading-[0.9] tracking-tight mb-6"
                    >
                        Ton glow,
                        <br />
                        <span className="shimmer-text italic">sans exploser</span>
                        <br />
                        ton budget.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-xl mx-auto text-lg md:text-xl text-mocha/60 mb-10 leading-relaxed"
                    >
                        Des produits beauté, cheveux et skincare sélectionnés avec amour pour ta routine glow quotidienne.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <MagneticButton className="group flex items-center gap-3 px-8 py-4 bg-mocha text-cream rounded-full text-sm font-semibold tracking-wide hover:bg-gold transition-colors duration-500 shadow-xl shadow-mocha/10">
                            Découvrir les produits
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </MagneticButton>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-mocha border border-mocha/20 hover:border-gold hover:text-gold transition-colors duration-300"
                        >
                            Notre histoire
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Decorative spinning ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-gold/10 pointer-events-none"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-nude-300/20 pointer-events-none"
                />
            </section>

            {/* ═══════════════════════════════════════
                MARQUEE / TRUST BAR
            ═══════════════════════════════════════ */}
            <AnimatedSection className="py-12 border-y border-gold/10 bg-cream/50 backdrop-blur-sm overflow-hidden">
                <motion.div variants={fadeUp} className="flex items-center justify-center gap-12 animate-shimmer">
                    {["Cruelty-Free", "100% Naturel", "Prix Justes", "Made in Morocco", "Livraison Rapide"].map((tag) => (
                        <div key={tag} className="flex items-center gap-2 text-mocha/40 whitespace-nowrap">
                            <Star size={14} className="fill-gold/40 text-gold/40" />
                            <span className="text-sm font-medium tracking-wider uppercase">{tag}</span>
                        </div>
                    ))}
                </motion.div>
            </AnimatedSection>

            {/* ═══════════════════════════════════════
                PRODUCTS SECTION
            ═══════════════════════════════════════ */}
            <section id="produits" className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-20">
                        <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-4">
                            Notre Sélection
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl font-medium text-mocha mb-6">
                            Ta routine, <span className="italic">simplifiée</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="max-w-md mx-auto text-mocha/60">
                            Des produits efficaces, doux pour ta peau et respectueux de ton portefeuille.
                        </motion.p>
                    </AnimatedSection>

                    {/* Carousel */}
                    <AnimatedSection>
                        <motion.div variants={scaleIn} className="relative">
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex gap-6">
                                    {products.map((product, i) => (
                                        <div key={product.id} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                                            <ProductCard product={product} index={i} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-10">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={scrollPrev}
                                    className="w-12 h-12 rounded-full border border-mocha/20 flex items-center justify-center text-mocha hover:bg-mocha hover:text-cream transition-all duration-300 disabled:opacity-30"
                                    disabled={!canScrollPrev}
                                >
                                    <ChevronLeft size={20} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={scrollNext}
                                    className="w-12 h-12 rounded-full border border-mocha/20 flex items-center justify-center text-mocha hover:bg-mocha hover:text-cream transition-all duration-300 disabled:opacity-30"
                                    disabled={!canScrollNext}
                                >
                                    <ChevronRight size={20} />
                                </motion.button>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                FEATURES / ROUTINE SECTION
            ═══════════════════════════════════════ */}
            <section id="routine" className="relative z-10 py-32 px-6 bg-mocha text-cream overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(198,149,44,0.15),_transparent_50%)]" />

                <div className="max-w-7xl mx-auto relative">
                    <AnimatedSection className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-6">
                                La Routine Gloa
                            </motion.span>
                            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-medium mb-8 leading-tight">
                                3 étapes pour un <span className="italic text-gold-light">rayonnement naturel</span>
                            </motion.h2>

                            <div className="space-y-8">
                                {[
                                    { num: "01", title: "Nettoie en douceur", desc: "Débarrasse ta peau des impuretés sans l'agresser. Un teint frais, prêt à recevoir." },
                                    { num: "02", title: "Hydrate profondément", desc: "Des formules légères qui pénètrent vite et laissent la peau souple toute la journée." },
                                    { num: "03", title: "Protège & Glow", desc: "Termine avec une touche de lumière et une protection contre les agressions extérieures." },
                                ].map((step, i) => (
                                    <motion.div key={step.num} variants={fadeUp} custom={i} className="flex gap-6 group">
                                        <span className="font-display text-3xl text-gold/40 group-hover:text-gold transition-colors duration-300">
                                            {step.num}
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2 group-hover:text-gold-light transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-cream/50 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div variants={fadeUp} className="mt-10">
                                <MagneticButton className="flex items-center gap-2 px-6 py-3 bg-gold text-mocha rounded-full text-sm font-semibold hover:bg-gold-light transition-colors duration-300">
                                    Voir la routine complète
                                    <ArrowRight size={16} />
                                </MagneticButton>
                            </motion.div>
                        </div>

                        <motion.div variants={scaleIn} className="relative">
                            <div className="aspect-[3/4] rounded-[2rem] bg-gradient-to-br from-nude-300/20 to-gold/20 backdrop-blur-sm border border-white/10 overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center text-cream/20 text-sm">
                                    [Image Routine]
                                </div>
                            </div>
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30"
                            />
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                STORY SECTION
            ═══════════════════════════════════════ */}
            <section id="histoire" className="relative z-10 py-32 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <AnimatedSection>
                        <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-6">
                            Notre Histoire
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl font-medium text-mocha mb-10 leading-tight">
                            Né d'une conviction simple : <br />
                            <span className="italic">la beauté n'a pas de prix.</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-lg text-mocha/60 leading-relaxed max-w-2xl mx-auto mb-12">
                            Gloa est né à Casablanca, d'une envie de rendre la skincare premium accessible à toutes.
                            Pas de marketing agressif, pas de prix gonflés — juste des produits qui fonctionnent,
                            sélectionnés avec soin et vendus à prix juste.
                        </motion.p>
                        <motion.div variants={fadeUp} className="flex items-center justify-center gap-12">
                            <div className="text-center">
                                <div className="font-display text-4xl text-gold mb-1">12K+</div>
                                <div className="text-sm text-mocha/50">Clientes satisfaites</div>
                            </div>
                            <div className="w-px h-12 bg-gold/20" />
                            <div className="text-center">
                                <div className="font-display text-4xl text-gold mb-1">50+</div>
                                <div className="text-sm text-mocha/50">Produits sélectionnés</div>
                            </div>
                            <div className="w-px h-12 bg-gold/20" />
                            <div className="text-center">
                                <div className="font-display text-4xl text-gold mb-1">4.9</div>
                                <div className="text-sm text-mocha/50">Note moyenne</div>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                NEWSLETTER SECTION
            ═══════════════════════════════════════ */}
            <section className="relative z-10 py-32 px-6">
                <AnimatedSection className="max-w-3xl mx-auto">
                    <motion.div
                        variants={scaleIn}
                        className="relative rounded-[2.5rem] bg-gradient-to-br from-nude-100 to-blush p-12 md:p-20 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
                        <div className="relative text-center">
                            <h3 className="font-display text-3xl md:text-4xl font-medium text-mocha mb-4">
                                Rejoins le <span className="italic">club Gloa</span>
                            </h3>
                            <p className="text-mocha/60 mb-8">
                                -10% sur ta première commande et des conseils glow directement dans ta boîte mail.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Ton adresse email"
                                    className="flex-1 px-6 py-4 rounded-full bg-white/80 border border-gold/10 text-mocha placeholder:text-mocha/30 focus:outline-none focus:border-gold/40 transition-colors"
                                />
                                <MagneticButton className="px-8 py-4 bg-mocha text-cream rounded-full text-sm font-semibold hover:bg-gold transition-colors duration-300 whitespace-nowrap">
                                    S'inscrire
                                </MagneticButton>
                            </div>
                        </div>
                    </motion.div>
                </AnimatedSection>
            </section>

            {/* ═══════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════ */}
            <footer id="contact" className="relative z-10 border-t border-gold/10 bg-cream/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <AnimatedSection className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-2">
                            <h4 className="font-display text-3xl font-medium text-mocha mb-4">Gloa</h4>
                            <p className="text-mocha/50 max-w-sm leading-relaxed">
                                Beauté accessible, prix justes, glow garanti.
                                Parce que ta peau mérite le meilleur sans compromis.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-mocha mb-4 text-sm tracking-wider uppercase">Navigation</h5>
                            <ul className="space-y-3">
                                {["Produits", "Routine", "Histoire", "FAQ"].map((item) => (
                                    <li key={item}>
                                        <a href={`#${item.toLowerCase()}`} className="text-mocha/50 hover:text-gold transition-colors duration-300 text-sm">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold text-mocha mb-4 text-sm tracking-wider uppercase">Contact</h5>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-mocha/50 text-sm">
                                    <Mail size={14} className="text-gold" />
                                    hello@gloa.ma
                                </li>
                                <li className="flex items-center gap-2 text-mocha/50 text-sm">
                                    <MapPin size={14} className="text-gold" />
                                    Casablanca, Maroc
                                </li>
                                <li className="flex items-center gap-2 text-mocha/50 text-sm">
                                    <Instagram size={14} className="text-gold" />
                                    @gloa.ma
                                </li>
                            </ul>
                        </div>
                    </AnimatedSection>
                    <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mocha/40">
                        <p>© 2026 Gloa. Tous droits réservés.</p>
                        <p>Fait avec amour au Maroc</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}