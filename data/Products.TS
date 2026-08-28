// ─────────────────────────────────────────────────────────────
// 🧴 C'EST ICI QUE VOUS AJOUTEZ VOS VRAIS PRODUITS
// Pour chaque produit, remplissez : image, nom, description, prix
// L'image doit être placée dans /public/products/ (voir README.md)
// L'ordre ici = l'ordre dans le carrousel.
// ─────────────────────────────────────────────────────────────

export type Product = {
    id: string;
    name: string;
    description: string;
    price: string; // ex: "149 MAD"
    oldPrice?: string; // optionnel, ex: "199 MAD" pour montrer une promo
    image: string; // chemin vers /public/products/...
    tag?: string; // optionnel, ex: "Best-seller", "Nouveau"
};

export const products: Product[] = [
    {
        id: "product-1",
        name: "Nom du produit 1",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "0 MAD",
        image: "/products/product-1.jpg",
        tag: "Best-seller",
    },
    {
        id: "product-2",
        name: "Nom du produit 2",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "0 MAD",
        image: "/products/product-2.jpg",
    },
    {
        id: "product-3",
        name: "Nom du produit 3",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "0 MAD",
        image: "/products/product-3.jpg",
    },
    {
        id: "product-4",
        name: "Nom du produit 4",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "0 MAD",
        image: "/products/product-4.jpg",
        tag: "Nouveau",
    },
    {
        id: "product-5",
        name: "Nom du produit 5",
        description:
            "Description courte du produit : à quoi il sert, pour quel type de peau, et ce qui le rend spécial.",
        price: "0 MAD",
        image: "/products/product-5.jpg",
    },
];