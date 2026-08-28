// ─────────────────────────────────────────────────────────────
// 🧴 C'EST ICI QUE VOUS AJOUTEZ VOS VRAIS PRODUITS
//
// Placez vos images dans : /public/products/
// Exemple : /public/products/product-1.jpg
//
// L'ordre ici = l'ordre dans le carrousel.
// ─────────────────────────────────────────────────────────────

export type Product = {
    id: string;
    name: string;
    description: string;
    price: string;
    oldPrice?: string;
    image: string;
    tag?: string;
};

export const products: Product[] = [
    {
        id: "product-1",
        name: "Nom du produit 1",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "149 MAD",
        image: "/products/product-1.png",
        tag: "Best-seller",
    },

    {
        id: "product-2",
        name: "Nom du produit 2",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "179 MAD",
        image: "/products/product-2.jpg",
    },

    {
        id: "product-3",
        name: "Nom du produit 3",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "199 MAD",
        image: "/products/product-3.jpg",
    },

    {
        id: "product-4",
        name: "Nom du produit 4",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "229 MAD",
        image: "/products/product-4.jpg",
        tag: "Nouveau",
    },

    {
        id: "product-5",
        name: "Nom du produit 5",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "249 MAD",
        image: "/products/product-5.jpg",
    },
];