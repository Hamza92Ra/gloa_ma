"use client";

import { useState } from "react";
import { X, MessageCircle, Instagram, Copy, Check } from "lucide-react";

interface OrderModalProps {
    productName: string;
    productPrice?: string;
    whatsappNumber: string; // ex: "212612345678" (sans + ni espaces)
    instagramUsername?: string;
}

export default function OrderModal({
    productName,
    productPrice,
    whatsappNumber,
    instagramUsername = "gloa.ma"
}: OrderModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [ville, setVille] = useState("");
    const [copied, setCopied] = useState(false);

    const generateMessage = () => {
        return `Bonjour Gloa ! 👋\n\nJe voudrais commander :\n🛍️ ${productName}${productPrice ? ` (${productPrice})` : ""}\n\n📋 Mes informations :\n👤 Nom : ${nom}\n📱 Téléphone : ${telephone}\n📍 Ville : ${ville}\n\nMerci beaucoup ! ✨`;
    };

    // ✅ WhatsApp : le message apparaît DIRECTEMENT dans la boîte de texte
    const handleWhatsApp = () => {
        const message = generateMessage();
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
        setIsOpen(false);
        resetForm();
    };

    // Instagram : copie + ouvre le DM (Instagram ne supporte pas le pré-remplissage)
    const handleInstagram = async () => {
        const message = generateMessage();
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error("Erreur copie:", err);
        }
        window.open(`https://ig.me/m/${instagramUsername}`, "_blank");
    };

    const resetForm = () => {
        setNom("");
        setTelephone("");
        setVille("");
    };

    return (
        <>
            {/* Bouton déclencheur */}
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

                        <button onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-[#6b5b4f] hover:text-[#2c1810] transition-colors">
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold text-[#2c1810]">Finaliser ta commande</h3>
                            <p className="text-sm text-[#6b5b4f] mt-1">{productName}</p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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

                            {/* WhatsApp : message apparaît directement */}
                            <button type="button" onClick={handleWhatsApp}
                                className="w-full py-3.5 mt-2 bg-[#25D366] text-white rounded-xl font-semibold
                  transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                                <MessageCircle size={20} />
                                Commander via WhatsApp
                            </button>

                            {/* Instagram : copie + ouvre DM */}
                            <button type="button" onClick={handleInstagram}
                                className="w-full py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f77737] text-white rounded-xl font-semibold
                  transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                                {copied ? <Check size={18} /> : <Instagram size={18} />}
                                {copied ? "Message copié ! Ouvre Instagram" : "Commander via Instagram"}
                            </button>

                            <p className="text-xs text-center text-[#8a7a6a] mt-3">
                                💡 <strong>WhatsApp</strong> : le message apparaît automatiquement.<br />
                                📋 <strong>Instagram</strong> : le message est copié, il te suffit de le coller.
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function ShoppingBagIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
}