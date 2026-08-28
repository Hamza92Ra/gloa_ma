// "use client";

// import { useCallback, useEffect, useState } from "react";
// // import Image from "next/image";
// import useEmblaCarousel from "embla-carousel-react";
// import AutoScroll from "embla-carousel-autoplay";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";
// import { products } from "@/data/Products";

// export default function ProductCarousel() {
//     // loop: true => boucle infinie. La souris/le doigt peut glisser (swipe)
//     // dans les deux sens, indéfiniment.
//     const [emblaRef, emblaApi] = useEmblaCarousel(
//         { loop: true, align: "center", skipSnaps: false, dragFree: false },
//         [AutoScroll({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true })]
//     );

//     const [selectedIndex, setSelectedIndex] = useState(0);

//     const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
//     const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

//     useEffect(() => {
//         if (!emblaApi) return;
//         const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
//         emblaApi.on("select", onSelect);
//         onSelect();
//         return () => {
//             emblaApi.off("select", onSelect);
//         };
//     }, [emblaApi]);

//     return (
//         <section id="produits" className="mx-auto max-w-6xl px-6 py-24">
//             <div className="mb-14 text-center">
//                 <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
//                     Nos produits
//                 </p>
//                 <h2 className="font-display text-3xl italic text-mocha sm:text-4xl">
//                     5 essentiels pour ta routine
//                 </h2>
//                 <p className="mx-auto mt-4 max-w-md text-sm text-mocha/60">
//                     Glisse pour découvrir la sélection — chaque produit a été choisi
//                     pour son efficacité et son prix doux.
//                 </p>
//             </div>

//             <div className="relative">
//                 {/* Fondu sur les bords pour indiquer que le carrousel continue à l'infini */}
//                 <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-cream to-transparent sm:w-24" />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cream to-transparent sm:w-24" />

//                 <div className="overflow-hidden" ref={emblaRef}>
//                     <div className="flex touch-pan-y">
//                         {products.map((product, index) => {
//                             const isActive = index === selectedIndex;
//                             return (
//                                 <div
//                                     key={product.id}
//                                     className="min-w-0 flex-[0_0_82%] px-3 sm:flex-[0_0_58%] md:flex-[0_0_38%] lg:flex-[0_0_30%]"
//                                 >
//                                     <motion.div
//                                         animate={{
//                                             scale: isActive ? 1 : 0.94,
//                                             opacity: isActive ? 1 : 0.55,
//                                         }}
//                                         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//                                         className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/60 shadow-sm shadow-mocha/5 ring-1 ring-mocha/5"
//                                     >
//                                         <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-200">
//                                             <img
//                                                 src={product.image}
//                                                 alt={product.name}
//                                                 style={{
//                                                     position: "absolute",
//                                                     inset: 0,
//                                                     width: "100%",
//                                                     height: "100%",
//                                                     objectFit: "cover",
//                                                 }}
//                                             />
//                                         </div>

//                                         <div className="flex flex-1 flex-col p-5">
//                                             <h3 className="font-display text-lg italic text-mocha">
//                                                 {product.name}
//                                             </h3>
//                                             <p className="mt-2 flex-1 text-sm leading-relaxed text-mocha/60">
//                                                 {product.description}
//                                             </p>
//                                             <div className="mt-4 flex items-center justify-between">
//                                                 <div className="flex items-baseline gap-2">
//                                                     <span className="text-base font-bold text-mocha">
//                                                         {product.price}
//                                                     </span>
//                                                     {product.oldPrice && (
//                                                         <span className="text-xs text-mocha/40 line-through">
//                                                             {product.oldPrice}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <a
//                                                     href="#waitlist"
//                                                     className="rounded-full border border-mocha/15 px-4 py-2 text-xs font-semibold text-mocha transition-colors hover:border-gold hover:bg-gold/10"
//                                                 >
//                                                     Je le veux
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Contrôles */}
//                 <div className="mt-8 flex items-center justify-center gap-4">
//                     <button
//                         onClick={scrollPrev}
//                         aria-label="Produit précédent"
//                         className="flex h-10 w-10 items-center justify-center rounded-full border border-mocha/15 text-mocha transition-colors hover:border-gold hover:text-gold-dark"
//                     >
//                         <ChevronLeft size={18} />
//                     </button>

//                     <div className="flex items-center gap-2">
//                         {products.map((product, index) => (
//                             <button
//                                 key={product.id}
//                                 aria-label={`Aller au produit ${index + 1}`}
//                                 onClick={() => emblaApi?.scrollTo(index)}
//                                 className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-6 bg-gold" : "w-1.5 bg-mocha/20"
//                                     }`}
//                             />
//                         ))}
//                     </div>

//                     <button
//                         onClick={scrollNext}
//                         aria-label="Produit suivant"
//                         className="flex h-10 w-10 items-center justify-center rounded-full border border-mocha/15 text-mocha transition-colors hover:border-gold hover:text-gold-dark"
//                     >
//                         <ChevronRight size={18} />
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// }