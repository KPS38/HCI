'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

type BasketItem = {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  quantity: number;
};

export default function BasketPage() {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [voucher, setVoucher] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  function applyVoucher() {
    const match = voucher.match(/^discount(\d{1,2})$/i);
    if (match) {
      const percent = parseInt(match[1], 10);
      if (percent > 0 && percent <= 99) {
        setDiscount(percent);
        if (typeof window !== "undefined") {
          localStorage.setItem("basket_discount", percent.toString());
        }
      } else {
        setDiscount(0);
        if (typeof window !== "undefined") {
          localStorage.removeItem("basket_discount");
        }
      }
    } else {
      setDiscount(0);
      if (typeof window !== "undefined") {
        localStorage.removeItem("basket_discount");
      }
    }
    setVoucher(""); // Reset voucher field after applying
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("basket");
      if (stored) {
        // Upgrade old basket format if needed
        const parsed: BasketItem[] = JSON.parse(stored);
        const upgraded = parsed.map(item =>
          item.quantity ? item : { ...item, quantity: 1 }
        );
        setItems(upgraded);
      }
    }
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Load discount from localStorage if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDiscount = localStorage.getItem("basket_discount");
      if (storedDiscount) {
        setDiscount(Number(storedDiscount));
      }
    }
  }, []);

  // Calculate subtotal for each item
  function getSubtotal(item: BasketItem) {
    return parseFloat(item.price) * item.quantity;
  }

  const total = items.reduce((sum, item) => sum + getSubtotal(item), 0);
  const discountedTotal = discount > 0 ? total * (1 - discount / 100) : total;

  function removeItem(id: string) {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("basket", JSON.stringify(updated));
    }
  }

  function updateQuantity(id: string, qty: number) {
    if (qty < 1) return;
    const updated = items.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("basket", JSON.stringify(updated));
    }
  }

  function handleCheckout() {
    if (!user) {
      router.push("/signin");
    } else {
      router.push("/checkout");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#18181b] pt-24 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white dark:bg-[#232323] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">Your Basket</h1>
        {items.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <p>Your basket is empty.</p>
            <Link href="/certifications" className="text-[#10B981] font-semibold hover:underline mt-4 block">
              Browse Certifications
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
              {items.map(item => (
                <li key={item.id} className="flex items-center py-4">
                  {item.imageUrl && (
                    <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded mr-4" />
                  )}
                  <div className="flex-1">
                    <span className="font-bold text-lg text-black dark:text-white">{item.name}</span>
                    <span className="block text-gray-600 dark:text-gray-300">
                      Price: {item.price} &nbsp;|&nbsp; 
                      <span>
                        Quantity: 
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={e => updateQuantity(item.id, Number(e.target.value))}
                          className="ml-2 w-16 px-2 py-1 border rounded text-black dark:text-white bg-white dark:bg-[#232323]"
                        />
                        {/* Subtotal for this item */}
                        <span className="ml-4 text-sm text-[#10B981] font-semibold">
                          Subtotal: {(getSubtotal(item)).toFixed(2)}€
                        </span>
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {/* Voucher input */}
            <div className="flex items-center mb-4 flex-col md:flex-row md:items-center">
              <div className="w-full md:w-auto flex flex-col md:flex-row md:items-center">
                <input
                  type="text"
                  value={voucher}
                  onChange={e => setVoucher(e.target.value)}
                  placeholder="Voucher code"
                  className="px-4 py-2 mb-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      applyVoucher();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={applyVoucher}
                  className="bg-[#10B981] text-white font-bold px-4 py-2 rounded hover:bg-[#059669] transition-colors w-full md:w-auto"
                  style={{ minWidth: "100px" }}
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <span className="mt-2 md:mt-0 md:ml-4 text-[#10B981] font-bold w-full text-center">
                  -{discount}% discount applied
                </span>
              )}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-xl text-black dark:text-white">Total:</span>
              <span className="font-bold text-xl text-[#10B981]">
                {discount > 0 ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">{total.toFixed(2)}€</span>
                    {discountedTotal.toFixed(2)}€
                  </>
                ) : (
                  total.toFixed(2) + "€"
                )}
              </span>
            </div>
            <button
              className="w-full bg-[#10B981] text-white font-bold py-3 rounded hover:bg-[#059669] transition-colors"
              disabled={items.length === 0}
              title={!user ? "You must be signed in to checkout." : undefined}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </main>
  );
}
