"use client";

import { useCartStore } from "../store/cartStore";

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <button
      onClick={() => {
        addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });

        openCart();
      }}
      className="mt-8 w-full md:w-auto bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
}