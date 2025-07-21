'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";

type OrderItem = {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  quantity: number;
};

type Order = {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  discount?: number;
  created_at: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data: auth } = await supabase.auth.getUser();
      const user: User | null = auth?.user;
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#18181b] py-12 mt-24 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white dark:bg-[#232323] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">Your Orders</h1>
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <p>No orders found.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
            {orders.map(order => (
              <li key={order.id} className="py-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-black dark:text-white">
                    Order #{order.id}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-black dark:text-white">Total:</span> <span className="text-black dark:text-white">{Number(order.total).toFixed(2)}€</span>
                  {order.discount && order.discount > 0 && (
                    <span className="ml-2 text-[#10B981] font-bold">(-{order.discount}% applied)</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-black dark:text-white">Items:</span>
                  <ul className="ml-4 list-disc">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        <span className="font-bold text-black dark:text-white">{item.name}</span> <span className="text-black dark:text-white">&times;{item.quantity} ({item.price})</span>
                        {item.imageUrl && (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="inline-block ml-2 align-middle rounded"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
