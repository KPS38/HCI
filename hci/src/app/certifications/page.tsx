'use client'
import Link from 'next/link';
import Image from 'next/image';
import { getCertifications, Certification } from "./_lib/api";
import CertificationFilter from "./_components/filter";
import { useState, useEffect } from "react";

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications().then(data => {
      setCertifications(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1e1e1e] bg-opacity-90 text-[#1e1e1e] dark:text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Certifications</h1>
        <CertificationsGrid certifications={certifications} />
      </div>
    </div>
  );
}

// Client Component for filtering and grid
function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  const [filtered, setFiltered] = useState<Certification[]>(certifications);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortType, setSortType] = useState<"price-asc" | "price-desc" | "az" | "za">("price-asc");

  function handleFiltered(filteredList: Certification[]) {
    setFiltered(filteredList as Certification[]);
  }

  function addItem(item: { id: string; name: string; price: string; imageUrl?: string; quantity: number }) {
    // Always start from the latest basket in localStorage
    let current: { id: string; name: string; price: string; imageUrl?: string; quantity?: number }[] = [];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("basket");
      if (stored) {
        try {
          current = JSON.parse(stored);
        } catch {
          current = [];
        }
      }
    }
    // Check if item already exists, if so, add up quantity
    const existing = current.find(b => b.id === item.id);
    let updated;
    if (existing) {
      updated = current.map(b =>
        b.id === item.id
          ? { ...b, quantity: (b.quantity || 1) + item.quantity }
          : b
      );
    } else {
      updated = [...current, { ...item }];
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("basket", JSON.stringify(updated));
    }
  }

  function handleAddToCart(cert: Certification) {
    const imageUrl = cert.image?.fields.file.url ? `https:${cert.image.fields.file.url}` : undefined;
    addItem({
      id: cert.id,
      name: cert.name,
      price: cert.price,
      imageUrl,
      quantity: 1,
    });
  }

  // Sorting logic (client-side, since filter already sorts, but we want to allow user to change)
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "price-asc") return parseFloat(a.price) - parseFloat(b.price);
    if (sortType === "price-desc") return parseFloat(b.price) - parseFloat(a.price);
    if (sortType === "az") return a.name.localeCompare(b.name);
    if (sortType === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row gap-0 md:gap-8">
      <div className="md:w-1/4 w-full max-w-xs border-r border-gray-200 dark:border-gray-800 pr-0 md:pr-6">
        <CertificationFilter certifications={certifications} onFiltered={handleFiltered} />
      </div>
      <div className="md:w-3/4 w-full">
        {/* Sorting and view type controls */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-4 gap-2">
          {/* Mobile: sort left, filter right, no filter text */}
          <div className="w-full flex flex-row items-center justify-between gap-2 sm:justify-start">
            <div className="flex-1 flex items-center">
              <select
                value={sortType}
                onChange={e => setSortType(e.target.value as "price-asc" | "price-desc" | "az" | "za")}
                className="w-full sm:w-auto px-3 py-2 rounded-lg border-2 border-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-[#10B981] transition font-medium"
                style={{ minWidth: 150, maxWidth: 220 }}
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="az">Name: A-Z</option>
                <option value="za">Name: Z-A</option>
              </select>
            </div>
            <div className="flex items-center ml-2">
              {/* Hide filter label on mobile, show only button */}
              <div className="block md:hidden">
                {/* The filter button is rendered inside CertificationFilter, so nothing here */}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              className={`p-2 rounded border transition-colors duration-150 ${viewType === "grid" ? "bg-[#10B981] text-white border-[#10B981]" : "border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 bg-white dark:bg-[#18181b]"}`}
              onClick={() => setViewType("grid")}
              title="Grid view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              className={`p-2 rounded border transition-colors duration-150 ${viewType === "list" ? "bg-[#10B981] text-white border-[#10B981]" : "border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 bg-white dark:bg-[#18181b]"}`}
              onClick={() => setViewType("list")}
              title="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="4" y="5" width="16" height="3" rx="1" />
                <rect x="4" y="10.5" width="16" height="3" rx="1" />
                <rect x="4" y="16" width="16" height="3" rx="1" />
              </svg>
            </button>
          </div>
        </div>
        {/* Products */}
        {viewType === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-l border-t border-gray-200 dark:border-gray-800">
            {sorted.map((cert) => (
              <div
                key={cert.id}
                className="bg-gray-100 dark:bg-[#1e1e1e] border-b border-r border-gray-200 dark:border-gray-800 flex flex-col"
              >
                {cert.image && (
                  <Image
                    src={`https:${cert.image.fields.file.url}`}
                    alt={cert.name}
                    width={270}
                    height={120}
                    className="w-[270px] h-[120px] object-contain mx-auto py-4"
                  />
                )}
                <div className="p-4 md:p-6 flex flex-col flex-1 relative">
                  <Link
                    href={`/certifications/${cert.id}`}
                    className="text-lg md:text-2xl font-bold mb-2 text-left text-[#10B981] hover:underline"
                  >
                    {cert.name}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm md:text-base">
                    <strong>Provider:</strong> {cert.provider}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm md:text-base">
                    <strong>Difficulty:</strong> {cert.difficulty}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm md:text-base">
                    <strong>Price:</strong> {cert.price}
                  </p>
                  <div className="flex flex-col items-center gap-2 mt-auto">
                    <button
                      type="button"
                      className="w-full bg-[#10B981] text-white font-bold py-2 rounded hover:bg-[#059669] transition-colors mt-2"
                      onClick={() => handleAddToCart(cert)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            {sorted.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-row items-center bg-gray-100 dark:bg-[#1e1e1e] px-4 py-4"
              >
                {cert.image && (
                  <Image
                    src={`https:${cert.image.fields.file.url}`}
                    alt={cert.name}
                    width={90}
                    height={60}
                    className="object-contain rounded mr-4"
                  />
                )}
                <div className="flex-1 flex flex-col">
                  <Link
                    href={`/certifications/${cert.id}`}
                    className="text-lg font-bold mb-1 text-left text-[#10B981] hover:underline"
                  >
                    {cert.name}
                  </Link>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span><strong>Provider:</strong> {cert.provider}</span>
                    <span><strong>Difficulty:</strong> {cert.difficulty}</span>
                    <span><strong>Price:</strong> {cert.price}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    className="bg-[#10B981] text-white font-bold py-2 px-4 rounded hover:bg-[#059669] transition-colors"
                    onClick={() => handleAddToCart(cert)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}