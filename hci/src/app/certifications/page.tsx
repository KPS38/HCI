'use client'
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
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center
          text-[#232323] dark:text-white">
          Our Security Certifications
        </h1>
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
    // Always start from the latest basket in localStorage, with expiry
    let current: { id: string; name: string; price: string; imageUrl?: string; quantity?: number }[] = [];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("basket");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (data.expiry && Date.now() > data.expiry) {
            localStorage.removeItem("basket");
            current = [];
          } else {
            current = Array.isArray(data.items) ? data.items : [];
          }
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
    // Save basket with expiry (1 day)
    if (typeof window !== "undefined") {
      const expiry = Date.now() + 1 * 24 * 60 * 60 * 1000;
      localStorage.setItem("basket", JSON.stringify({ items: updated, expiry }));
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
      <video autoPlay muted loop className="backgroundVideo absolute inset-0 w-full h-full object-cover">
        <source src="/images/wallpaper.mp4" type="video/mp4" />
      </video>
      {/* Render CertificationFilter once, outside of responsive divs */}
      <div className="w-full md:w-1/4 border-r border-gray-200 dark:border-gray-800 pr-0 md:pr-6">
        <CertificationFilter certifications={certifications} onFiltered={handleFiltered} />
      </div>
      <div className="md:w-3/4 w-full">
        {/* Mobile: filter, sort, grid/list in one line */}
        <div className="w-full border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
          <div className="flex flex-row items-center w-full gap-2 justify-between">
            {/* Sort dropdown */}
            <div className="flex-1 flex items-center">
              <select
                value={sortType}
                onChange={e => setSortType(e.target.value as "price-asc" | "price-desc" | "az" | "za")}
                className="w-full px-3 py-2 rounded-lg border-2 border-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-[#10B981] transition font-medium md:w-56"
                style={{ minWidth: 0, maxWidth: "320px" }}
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="az">Name: A-Z</option>
                <option value="za">Name: Z-A</option>
              </select>
            </div>
            {/* Grid/List toggle */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                className={`p-2 rounded border transition-colors duration-150 ${viewType === "grid" ? "bg-[#10B981] text-white border-[#10B981]" : "border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 bg-white dark:bg-[#18181b]"}`}
                onClick={() => setViewType("grid")}
                title="Grid view"
                style={{ minWidth: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
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
                style={{ minWidth: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="4" y="5" width="16" height="3" rx="1" />
                  <rect x="4" y="10.5" width="16" height="3" rx="1" />
                  <rect x="4" y="16" width="16" height="3" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Products */}
        {viewType === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-l border-t border-gray-300 dark:border-gray-700">
            {sorted.map((cert) => (
              <div
                key={cert.id}
                className="bg-gray-100 dark:bg-[#1e1e1e] border-b border-r border-gray-300 dark:border-gray-700 flex flex-col group cursor-pointer"
                // Make the whole card clickable except the Add to cart button
                onClick={e => {
                  // Prevent click if Add to cart button is clicked
                  if ((e.target as HTMLElement).closest("button")) return;
                  window.location.href = `/certifications/${cert.id}`;
                }}
                tabIndex={0}
                role="link"
                style={{ outline: "none" }}
              >
                {cert.image && (
                  <Image
                    src={`https:${cert.image.fields.file.url}`}
                    alt={cert.name}
                    width={340}
                    height={180}
                    className="w-[340px] h-[180px] object-contain mx-auto py-4 pointer-events-none"
                  />
                )}
                <div className="p-4 md:p-6 flex flex-col flex-1 relative">
                  {/* Certificate name: black, green on hover */}
                  <span
                    className="text-base md:text-lg font-bold mb-2 text-left text-black group-hover:text-[#10B981] transition-colors duration-150"
                  >
                    {cert.name}
                  </span>
                  <span className="text-xs text-gray-400">{cert.provider} | {cert.difficulty}</span>
                  <p className="text-gray-600 dark:text-gray-300 mb-1 text-base md:text-lg font-semibold">
                    € {cert.price}
                  </p>
                  <div className="flex flex-col items-center gap-2 mt-auto">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center bg-[#10B981] hover:bg-[#059669] text-white font-bold px-5 py-2 rounded-lg shadow transition-colors"
                      onClick={e => {
                        e.stopPropagation();
                        handleAddToCart(cert);
                      }}
                    >
                      Add
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7" />
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth={2} />
                        <line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth={2} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-300 dark:divide-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            {sorted.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-row items-center bg-gray-100 dark:bg-[#1e1e1e] px-4 py-4 group cursor-pointer"
                style={{ borderBottom: "1.5px solid #d1d5db", paddingTop: "16px", paddingBottom: "16px" }}
                onClick={e => {
                  if ((e.target as HTMLElement).closest("button")) return;
                  window.location.href = `/certifications/${cert.id}`;
                }}
                tabIndex={0}
                role="link"
              >
                {cert.image && (
                  <Image
                    src={`https:${cert.image.fields.file.url}`}
                    alt={cert.name}
                    width={60}
                    height={40}
                    className="object-contain rounded mr-3 pointer-events-none"
                  />
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <span
                    className="text-base font-bold mb-1 text-left text-black dark:text-gray-300 group-hover:text-[#10B981] transition-colors duration-150"
                  >
                    {cert.name}
                  </span>
                  <span className="text-xs text-gray-400">{cert.provider} | {cert.difficulty}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>€ {cert.price}</strong>
                  </span>
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    className="bg-[#10B981] text-white font-bold py-2 px-3 rounded hover:bg-[#059669] transition-colors"
                    onClick={e => {
                      e.stopPropagation();
                      handleAddToCart(cert);
                    }}
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