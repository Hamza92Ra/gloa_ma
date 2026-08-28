"use client";

import { useState } from "react";
import { X, MessageCircle, Instagram, Check, ShoppingBag, AlertCircle } from "lucide-react";
import { CartItem } from "./CartContext";

interface OrderModalProps {
    items?: CartItem[];
    totalPrice?: number;
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
    const [errors, setErrors] = useState<{nom?: string; telephone?: string; ville?: string}>({});

    const isCart = items && items.length > 0;

    const validate = () => {
        const newErrors: {nom?: string; telephone?: string; ville?: string} = {};
        let valid = true;

        if (!nom.trim()) { newErrors.nom = "Le nom est obligatoire"; valid = false; }
        if (!telephone.trim()) { newErrors.telephone = "Le numéro est obligatoire"; valid = false; }
        else if (!/^[0-9]{10}$/.test(telephone)) { newErrors.telephone = "10 chiffres exactement"; valid = false; }
        if (!ville.trim()) { newErrors.ville = "La ville est obligatoire"; valid = false; }

        setErrors(newErrors);
        return valid;
    };

    const generateMessage = () => {
        let produitsText = "";
        if (isCart) {
            produitsText = items.map((item, i) => `${i + 1}. ${item.name} x${item.quantity} — ${item.price * item.quantity} MAD`).join("\n");
        } else {
            produitsText = `🛍️ ${productName}${productPrice ? ` (${productPrice})` : ""}`;
        }
        const total = isCart && totalPrice !== undefined ? `\n\n💰 *Total : ${totalPrice} MAD*` : "";
        return `Bonjour Gloa ! 👋\n\nJe voudrais commander :\n${produitsText}${total}\n\n📋 Mes informations :\n👤 Nom : ${nom}\n📱 Téléphone : ${telephone}\n📍 Ville : ${ville}\n\nMerci beaucoup ! ✨`;
    };

    const handleWhatsApp = () => {
        if (!validate()) return;
        const message = generateMessage();
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
        setIsOpen(false);
        resetForm();
    };

    const handleInstagram = async () => {
        if (!validate()) return;
        const message = generateMessage();
        try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 3000); } catch { }
        window.open(`https://ig.me/m/${instagramUsername}`, "_blank");
    };

    const resetForm = () => { setNom(""); setTelephone(""); setVille(""); setErrors({}); };

    return (
        <>
            <button onClick={() => setIsOpen(true)}
                className="w-full py-3.5 bg-[#2c1810] text-[#faf6f1] rounded-xl font-semibold transition-all hover:bg-[#c9a96e] hover:shadow-lg flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                {isCart ? "Commander mon panier" : "Passer commande"}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                    <div className="relative w-full max-w-md bg-[#faf6f1] rounded-2xl shadow-2xl p-6 lg:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-[#6b5b4f] hover:text-[#2c1810]"><X size={20} /></button>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold text-[#2c1810]">Finaliser ta commande</h3>
                            {isCart ? <p className="text-sm text-[#c9a96e] mt-1 font-medium">{items.length} article{items.length > 1 ? "s" : ""} — {totalPrice} MAD</p> : <p className="text-sm text-[#6b5b4f] mt-1">{productName}</p>}
                        </div>

                        {isCart && (
                            <div className="mb-5 p-4 bg-white/60 rounded-xl space-y-2 max-h-40 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-[#2c1810] truncate">{item.name} <span className="text-[#2c1810]/50">x{item.quantity}</span></span>
                                        <span className="text-[#c9a96e] font-medium">{item.price * item.quantity} MAD</span>
                                    </div>
                                ))}
                                <div className="border-t border-[#c9a96e]/20 pt-2 flex justify-between font-semibold"><span>Total</span><span>{totalPrice} MAD</span></div>
                            </div>
                        )}

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2c1810] mb-1">Nom complet *</label>
                                <input type="text" required value={nom} placeholder="Ton nom"
                                    onChange={(e) => { setNom(e.target.value); if (errors.nom) setErrors(p => ({...p, nom: undefined})); }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${errors.nom ? "border-red-400 focus:ring-red-300" : "border-[#e8d5c4] focus:ring-[#c9a96e]"}`} />
                                {errors.nom && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.nom}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2c1810] mb-1">Téléphone * (10 chiffres)</label>
                                <input type="tel" required maxLength={10} inputMode="numeric" pattern="[0-9]*" placeholder="06 XX XX XX XX"
                                    value={telephone}
                                    onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0,10); setTelephone(v); if (errors.telephone) setErrors(p => ({...p, telephone: undefined})); }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${errors.telephone ? "border-red-400 focus:ring-red-300" : "border-[#e8d5c4] focus:ring-[#c9a96e]"}`} />
                                {errors.telephone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.telephone}</p>}
                                <p className="text-[10px] text-[#8a7a6a] mt-1">{telephone.length}/10 chiffres</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2c1810] mb-1">Ville *</label>
                                <input type="text" required value={ville} placeholder="Casablanca, Marrakech..."
                                    onChange={(e) => { setVille(e.target.value); if (errors.ville) setErrors(p => ({...p, ville: undefined})); }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${errors.ville ? "border-red-400 focus:ring-red-300" : "border-[#e8d5c4] focus:ring-[#c9a96e]"}`} />
                                {errors.ville && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.ville}</p>}
                            </div>

                            <button type="button" onClick={handleWhatsApp}
                                className="w-full py-3.5 mt-2 bg-[#25D366] text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                                <MessageCircle size={20} /> Commander via WhatsApp
                            </button>
                            <button type="button" onClick={handleInstagram}
                                className="w-full py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f77737] text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                                {copied ? <Check size={18} /> : <Instagram size={18} />}
                                {copied ? "Message copié !" : "Commander via Instagram"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}