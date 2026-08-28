import { useCart } from "@/components/CartContext";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";

// À l'intérieur de ta boucle products.map((product) => ...) :
function AddButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    <AddButton product={product} />
    return (
        <button 
            onClick={() => {
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
            }}
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                added 
                    ? "bg-green-500 text-white" 
                    : "bg-[#c9a96e]/10 text-[#2c1810] hover:bg-[#c9a96e] hover:text-white"
            }`}
        >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            {added ? "Ajouté !" : "Ajouter au panier"}
        </button>
    );
}