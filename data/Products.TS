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
        name: "Packs Urban Complet",
        description:
        "",
        price: "249 MAD",
        image: "/products/product-1.png",
        tag: "Best-seller",
    },

    {
        id: "product-2",
        name: "Pack urban bleu à l'acide hyaluronique et collagne",
        description:
            "",
        price: "229 MAD",
        image: "/products/product-2.jpg",
    },

    {
        id: "product-3",
        name: "Pack urban keratine intense",
        description:
            "",
        price: "219 MAD",
        image: "/products/product-3.jpg",
    },

    {
        id: "product-4",
        name: "Pack urban biotine keratine ",
        description:
            "",
        price: "139 MAD",
        image: "/products/product-4.jpg",
        tag: "Nouveau",
    },

    {
        id: "product-5",
        name: "Urban Tea Tree Oil keratine  ",
        description:
            "",
        price: "80 MAD",
        image: "/products/product-5.jpg",
    },
];