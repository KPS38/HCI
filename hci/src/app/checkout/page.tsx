'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Read discount from basket in localStorage if present
    if (typeof window !== "undefined") {
      const storedDiscount = localStorage.getItem("basket_discount");
      if (storedDiscount) {
        setDiscount(Number(storedDiscount));
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return; // Prevent double submit
    setSubmitting(true);
    setError(null);
    // Card number must be 16 digits
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      setError("Card number must be 16 digits.");
      setSubmitting(false);
      return;
    }
    // CVC must be 3 or 4 digits
    if (!/^\d{3,4}$/.test(cvc)) {
      setError("CVC must be 3 or 4 digits.");
      setSubmitting(false);
      return;
    }
    // Month and year must be selected
    if (!month || !year) {
      setError("Please select month and year.");
      setSubmitting(false);
      return;
    }
    // Name and surname must not be empty
    if (!name.trim() || !surname.trim()) {
      setError("Please enter your name and surname.");
      setSubmitting(false);
      return;
    }

    // Get basket from localStorage
    const basketRaw = typeof window !== "undefined" ? localStorage.getItem("basket") : null;
    const basket: { id: string; name: string; price: string; imageUrl?: string; quantity: number }[] = basketRaw ? JSON.parse(basketRaw) : [];

    // Get user
    const { data } = await supabase.auth.getUser();
    const user: User | null = data?.user;

    if (!user) {
      setError("You must be signed in to complete purchase.");
      router.push("/signin");
      setSubmitting(false);
      return;
    }

    if (basket.length === 0) {
      setError("Your basket is empty.");
      setSubmitting(false);
      return;
    }

    setLoading(true);

    // Calculate total with discount from basket
    const total = basket.reduce((sum: number, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const discountedTotal = discount > 0 ? total * (1 - discount / 100) : total;

    // Save order to Supabase
    const { error: dbError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          items: basket,
          total: discountedTotal,
          discount: discount,
          created_at: new Date().toISOString(),
        },
      ]);

    setLoading(false);
    setSubmitting(false);

    if (dbError) {
      setError("Failed to save order. Please try again.");
      return;
    }

    // Clear basket and discount after purchase
    if (typeof window !== "undefined") {
      localStorage.removeItem("basket");
      localStorage.removeItem("basket_discount");
    }

    setError("Purchase successful! (Mockup, payment not processed)");
    setTimeout(() => {
      router.push("/orders");
    }, 1500);
  }

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];
  const years = Array.from({ length: 12 }, (_, i) => (new Date().getFullYear() + i).toString().slice(-2));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#18181b] flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#232323] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Payment</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] w-1/2"
              required
            />
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] w-1/2"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
            onChange={e => {
              // Remove all non-digits, limit to 16 digits
              const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
              setCardNumber(raw);
            }}
            maxLength={19}
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323]"
            required
          />
          <div className="flex gap-4">
            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#232323] w-1/2 text-black"
              required
            >
              <option value="" className="text-gray-400">Month</option>
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#232323] w-1/2 text-black"
              required
            >
              <option value="" className="text-gray-400">Year</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            maxLength={4}
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323]"
            required
          />
          <button
            type="submit"
            className="bg-[#10B981] text-white font-bold py-3 rounded hover:bg-[#059669] transition-colors mt-4"
            disabled={loading || submitting}
            title="This is a mockup. Payment is not implemented."
          >
            {loading || submitting ? "Processing..." : "Pay"}
          </button>
          {error && (
            <p className={`text-center mt-2 ${error.startsWith("Purchase successful") ? "text-green-600" : "text-red-500"}`}>{error}</p>
          )}
        </form>
        <div className="mt-6 text-center">
          <Link href="/basket" className="text-[#10B981] font-semibold hover:underline">
            Back to Basket
          </Link>
        </div>
      </div>
    </main>
  );
}

