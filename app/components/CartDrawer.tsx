"use client";

import { useCartStore } from "../store/cartStore";
import Image from "next/image";
import { useState } from "react";

export default function CartDrawer() {
  const [loading, setLoading] = useState<boolean>(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const cartOpen = useCartStore((state) => state.cartOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  async function handleCheckout(): Promise<void> {
    if (cartItems.length === 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data: { url?: string } = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-60
        ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>

          <button onClick={toggleCart} className="text-xl font-bold">
            ×
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[85%]">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 items-center border-b pb-3"
              >
                {item.image && (
  <Image
    src={item.image}
    width={60}
    height={60}
    alt={item.name}
    className="rounded object-cover"
  />
)}

                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">${item.price}</p>

                  <div className="flex items-center mt-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <span className="px-4">{item.quantity}</span>

                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="text-red-500 font-bold"
                  onClick={() => removeItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="block w-full text-center bg-cyan-950 text-white py-2 rounded hover:bg-black transition disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Checkout"}
            </button>
          </div>
        )}
      </div>

      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={toggleCart}
        />
      )}
    </>
  );
}