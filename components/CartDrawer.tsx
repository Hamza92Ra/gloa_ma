"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import Image from "next/image";
import OrderModal from "@/components/OrderModal";

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-mocha/40 backdrop-blur-sm z-[100]"
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gold/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} className="text-gold" />
                                <h2 className="font-display text-xl font-medium text-mocha">Ton Panier</h2>
                                <span className="px-2.5 py-0.5 bg-gold/10 text-gold text-xs font-semibold rounded-full">
                                    {totalItems}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-full bg-mocha/5 flex items-center justify-center text-mocha hover:bg-mocha hover:text-cream transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
                                        <ShoppingBag size={32} className="text-gold/40" />
                                    </div>
                                    <p className="text-mocha/50">Ton panier est vide</p>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-6 py-2.5 bg-mocha text-cream rounded-full text-sm font-medium hover:bg-gold transition-colors"
                                    >
                                        Découvrir les produits
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            key={item.id}
                                            className="flex gap-4 p-4 bg-white/60 rounded-2xl"
                                        >
                                            <div className="w-20 h-20 rounded-xl bg-nude-100 overflow-hidden flex-shrink-0 relative">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-mocha text-sm truncate">{item.name}</h4>
                                                <p className="text-gold font-semibold text-sm mt-1">{item.price} MAD</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 rounded-full border border-mocha/15 flex items-center justify-center text-mocha hover:bg-mocha hover:text-cream transition-all"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-6 text-center text-sm font-medium text-mocha">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 rounded-full border border-mocha/15 flex items-center justify-center text-mocha hover:bg-mocha hover:text-cream transition-all"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="ml-auto w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-all"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-gold/10 bg-white/40">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-mocha/60 text-sm">Sous-total</span>
                                    <span className="font-display text-2xl font-medium text-mocha">{totalPrice} MAD</span>
                                </div>
                                <OrderModal productName="Nom du produit ici" instagramUsername="gloa_ma" />
                                <button
                                    onClick={clearCart}
                                    className="w-full py-3 text-mocha/50 text-sm hover:text-red-400 transition-colors"
                                >
                                    Vider le panier
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}