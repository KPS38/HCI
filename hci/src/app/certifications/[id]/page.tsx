'use client'
import Link from 'next/link';
import { getCertification } from '../_lib/api';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CertificationProps = {
  params: { id: string };
};

export default function CertificationPost({ params }: CertificationProps) {
  const [post, setPost] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getCertification(params.id).then(setPost);
  }, [params.id]);

  // Move basket state initialization inside useEffect to avoid SSR issues
  const [basket, setBasket] = useState<{ id: string; name: string; price: string; imageUrl?: string }[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("basket");
      if (stored) setBasket(JSON.parse(stored));
    }
  }, []);

  function addItem(item: { id: string; name: string; price: string; imageUrl?: string; quantity: number }) {
    // Check if item exists, increment quantity if so
    const found = basket.find(b => b.id === item.id);
    let updated;
    if (found) {
      updated = basket.map(b =>
        b.id === item.id ? { ...b, quantity: (b.quantity ?? 1) + item.quantity } : b
      );
    } else {
      updated = [...basket, { ...item, quantity: item.quantity }];
    }
    setBasket(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("basket", JSON.stringify(updated));
    }
  }

  function handleAddToCart() {
    const imageUrl = post.image?.fields.file.url ?? '';
    addItem({
      id: post.id,
      name: post.name,
      price: post.price,
      imageUrl: imageUrl ? `https:${imageUrl}` : undefined,
      quantity,
    });
    router.push("/basket");
  }

  if (!post) {
    return <h1 className="text-center mt-10 text-3xl text-white">Certification Not Found</h1>;
  }

  const { name, provider, description, duration, price, image, difficulty } = post;
  const imageUrl = image?.fields.file.url ?? '';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#18181b] px-4 py-10">
      <article className="w-full max-w-2xl bg-white dark:bg-[#232323] border border-gray-200 dark:border-[#232323] shadow-xl rounded-2xl overflow-hidden p-8 relative">
        <Link
          href="/certifications"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-200 mb-6 hover:underline"
        >
          ← Back to Certifications
        </Link>
        <div className="flex flex-col md:flex-row items-start gap-8 mb-6">
          {imageUrl && (
            <div className="flex-shrink-0 flex justify-center items-center md:items-start w-full md:w-auto">
              <Image
                src={`https:${imageUrl}`}
                alt={name}
                width={200}
                height={200}
                className="rounded-lg shadow-md object-contain bg-gray-100 dark:bg-[#18181b] md:w-[100px] md:h-[100px] w-[100px] h-[100px]"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#10B981] mb-2">
              {name}
            </h1>
            <div className="flex flex-wrap gap-4 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#10B981] bg-opacity-10 text-[#10B981] text-sm font-semibold">
                {provider}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-[#232323] text-gray-700 dark:text-gray-300 text-sm font-semibold">
                {difficulty}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-[#232323] text-gray-700 dark:text-gray-300 text-sm font-semibold">
                {duration}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-[#232323] text-gray-700 dark:text-gray-300 text-sm font-semibold">
                {price}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
        <div className="flex justify-end items-center gap-4 mt-6">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-20 px-2 py-2 border rounded text-black dark:text-white bg-white dark:bg-[#232323]"
          />
          <button
            type="button"
            className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-5 py-2 rounded-lg shadow transition-colors"
            title="Add to cart"
            onClick={handleAddToCart}
          >
            <span>Add </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth={2} />
              <line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth={2} />
            </svg>
          </button>
        </div>
      </article>
    </main>
  );
}
