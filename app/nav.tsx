"use client";

import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";

const links = [
    { href: "#produits", label: "Produits" },
    { href: "#histoire", label: "Notre histoire" },
    { href: "#avis", label: "Avis" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled
                    ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(58,43,30,0.08)]"
                    : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <a
                    href="#accueil"
                    className="font-display text-2xl italic tracking-tight text-mocha"
                >
                    gloa
                </a>

                <ul className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm font-medium text-mocha/70 transition-colors hover:text-mocha"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    <a
                        href="https://www.instagram.com/gloa_ma"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Gloa sur Instagram"
                        className="text-mocha/70 transition-colors hover:text-gold"
                    >
                        <Instagram size={18} strokeWidth={1.75} />
                    </a>
                    <a
                        href="#waitlist"
                        className="rounded-full bg-mocha px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:scale-105"
                    >
                        Rejoindre
                    </a>
                </div>
            </nav>
        </header>
    );
}