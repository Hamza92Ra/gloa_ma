"use client";

import { useState } from "react";
import { X, Instagram, Copy, Check } from "lucide-react";

interface OrderModalProps {
    productName: string;
    instagramUsername?: string; // ex: "gloa.ma"
}

export default function OrderModal({ productName, instagramUsername = "gloa.ma" }: OrderModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [ville, setVille] = useState("");
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const message = `Bonjour Gloa ! 👋\n\nJe voudrais commander :\n🛍️ ${productName}\n\n📋 Mes informations :\n👤 Nom : ${nom}\n📱 Téléphone : ${telephone}\n📍 Localisation : ${ville}\n\nMerci beaucoup ! ✨`;

        // Copie le message dans le presse-papiers
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Erreur copie:", err);
        }

        // Ouvre Instagram DM (ig.me/m/USERNAME fonctionne sur mobile + desktop)
        const igLink = `https://ig.me/m/${instagramUsername}`;
        window.open(igLink, "_blank");

        // Ferme le modal après 1 seconde
        setTimeout(() => {
            setIsOpen(false);
            setNom(""); setTelephone(""); setVille("");
        }, 1000);
    };

    return (
        <>
            {/* Bouton déclencheur — remplace ton bouton "Passer commande" actuel par ça */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3 bg-[#2c1810] text-[#faf6f1] rounded-xl font-medium
          transition-all duration-300 hover:bg-[#3d2420] hover:shadow-lg flex items-center justify-center gap-2"
            >
                <ShoppingBagIcon />
                Passer commande
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}>
                    <div className="relative w-full max-w-md bg-[#faf6f1] rounded-2xl shadow-2xl p-6 lg:p-8"
                        onClick={(e) => e.stopPropagation()}>

                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-[#6b5b4f] hover:text-[#2c1810] transition-colors">
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#c9a96e] to-[#e8d5c4] rounded-full flex items-center justify-center">
                                <Instagram className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#2c1810]">Commander sur Instagram</h3>
                            <p className="text-sm text-[#6b5b4f] mt-1">{productName}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2c1810] mb-1">Nom complet</label>
                                <input type="text" required value={nom} onChange={(e) => setNom(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[#e8d5c4] bg-white text-[#2c1810] placeholder-[#b0a090] focus:outline-none focus:ring-2 focus:ring-[#c9a96e] transition-all"
                                    placeholder="Ton nom" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2c1810] mb-1">Numéro de téléphone</label>
                                <input type="tel" required value={telephone} onChange={(e) => setTelephone(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[#e8d5c4] bg-white text-[#2c1810] placeholder-[#b0a090] focus:outline-none focus:ring-2 focus:ring-[#c9a96e] transition-all"
                                    placeholder="06 XX XX XX XX" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2c1810] mb-1">Ville / Localisation</label>
                                <input type="text" required value={ville} onChange={(e) => setVille(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[#e8d5c4] bg-white text-[#2c1810] placeholder-[#b0a090] focus:outline-none focus:ring-2 focus:ring-[#c9a96e] transition-all"
                                    placeholder="Casablanca, Marrakech..." />
                            </div>

                            <button type="submit"
                                className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#c9a96e] to-[#b8956a] text-white rounded-xl font-semibold
                  transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? "Message copié !" : "Ouvrir Instagram & copier le message"}
                            </button>

                            <p className="text-xs text-center text-[#8a7a6a] mt-3">
                                Le message sera copié automatiquement. Il te suffira de le coller dans la conversation Instagram.
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

// Icône inline pour éviter l'import si tu ne l'as pas déjà
function ShoppingBagIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
}