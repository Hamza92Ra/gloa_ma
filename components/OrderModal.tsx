"use client";

import { useState } from "react";
import { X, MessageCircle, Instagram, Copy, Check, ShoppingBag } from "lucide-react";
import { CartItem } from "./CartContext";

interface OrderModalProps {
    items?: CartItem[];
    totalPrice?: number;
    // Garde aussi la compatibilité "single product" si besoin
    productName?: string;
    productPrice?: string;
    whatsappNumber: string;
    instagramUsername?: string;
}

export default function OrderModal({
    items,
    totalPrice,
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

    // Détecte si c'est un panier ou un produit unique
    const isCart = items && items.length > 0;

    const generateMessage = () => {
        let produitsText = "";

        if (isCart) {
            produitsText = items.map((item, i) => 
                `${i + 1}. ${item.name} x${item.quantity} — ${item.price * item.quantity} MAD`
            ).join("\n");
        } else {
            produitsText = `🛍️ ${productName}${productPrice ? ` (${productPrice})` : ""}`;
        }

        const total = isCart && totalPrice !== undefined 
            ? `\n\n💰 *Total : ${totalPrice} MAD*`
            : "";

        return `Bonjour Gloa ! 👋\n\nJe voudrais commander :\n${produitsText}${total}\n\n📋 Mes informations :\n👤 Nom : ${nom}\n📱 Téléphone : ${telephone}\n📍 Ville : ${ville}\n\nMerci beaucoup ! ✨`;
    };

    const handleWhatsApp = () => {
        const message = generateMessage();
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
        setIsOpen(false);
        resetForm();
    };

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

    // Label du bouton selon le contexte
    const btnLabel = isCart ? "Commander mon panier" : "Passer commande";

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3.5 bg-mocha text-cream rounded-xl font-semibold
                  transition-all duration-300 hover:bg-gold hover:shadow-lg flex items-center justify-center gap-2"
            >
                <ShoppingBag size={18} />
                {btnLabel}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}>
                    <div className="relative w-full max-w-md bg-cream rounded-2xl shadow-2xl p-6 lg:p-8 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}>

                        <button onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-mocha/60 hover:text-mocha transition-colors">
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold text-mocha">Finaliser ta commande</h3>
                            {isCart ? (
                                <p className="text-sm text-gold mt-1 font-medium">{items.length} article{items.length > 1 ? "s" : ""} — {totalPrice} MAD</p>
                            ) : (
                                <p className="text-sm text-mocha/60 mt-1">{productName}</p>
                            )}
                        </div>

                        {/* Récap du panier */}
                        {isCart && (
                            <div className="mb-5 p-4 bg-white/60 rounded-xl space-y-2 max-h-40 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-mocha truncate">{item.name} <span className="text-mocha/50">x{item.quantity}</span></span>
                                        <span className="text-gold font-medium">{item.price * item.quantity} MAD</span>
                                    </div>
                                ))}
                                <div className="border-t border-gold/20 pt-2 flex justify-between font-semibold">
                                    <span className="text-mocha">Total</span>
                                    <span className="text-mocha">{totalPrice} MAD</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-mocha mb-1">Nom complet</label>
                                <input type="text" required value={nom} onChange={(e) => setNom(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-white text-mocha placeholder-mocha/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                    placeholder="Ton nom" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-mocha mb-1">Numéro de téléphone</label>
                                <input type="tel" required value={telephone} onChange={(e) => setTelephone(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-white text-mocha placeholder-mocha/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                    placeholder="06 XX XX XX XX" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-mocha mb-1">Ville / Localisation</label>
                                <input type="text" required value={ville} onChange={(e) => setVille(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-white text-mocha placeholder-mocha/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                                    placeholder="Casablanca, Marrakech..." />
                            </div>

                            <button type="button" onClick={handleWhatsApp}
                                className="w-full py-3.5 mt-2 bg-[#25D366] text-white rounded-xl font-semibold
                  transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                                <MessageCircle size={20} />
                                Commander via WhatsApp
                            </button>

                            <button type="button" onClick={handleInstagram}
                                className="w-full py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f77737] text-white rounded-xl font-semibold
                  transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                                {copied ? <Check size={18} /> : <Instagram size={18} />}
                                {copied ? "Message copié ! Ouvre Instagram" : "Commander via Instagram"}
                            </button>

                            <p className="text-xs text-center text-mocha/50 mt-3">
                                💡 <strong>WhatsApp</strong> : le message apparaît automatiquement avec ta liste.<br />
                                📋 <strong>Instagram</strong> : le message est copié, il te suffit de le coller.
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}