import { useState, useMemo } from "react";
import type { Certification } from "../_lib/api"; // <-- Import the shared type

type FilterProps = {
  certifications: Certification[];
  onFiltered: (filtered: Certification[]) => void;
};

const getUnique = (arr: Certification[], key: keyof Certification) =>
  Array.from(new Set(arr.map(item => item[key])));

export default function CertificationFilter({ certifications, onFiltered }: FilterProps) {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Unique values for dropdowns
  const providers = useMemo(() => getUnique(certifications, "provider"), [certifications]);
  const difficulties = useMemo(() => getUnique(certifications, "difficulty"), [certifications]);

  // Filtering logic
  const filtered = useMemo(() => {
    return certifications.filter(cert => {
      const priceNum = typeof cert.price === "string" ? parseFloat(cert.price.replace(/[^\d.]/g, "")) : cert.price;
      return (
        (!search || cert.name.toLowerCase().includes(search.toLowerCase())) &&
        (!provider || cert.provider === provider) &&
        (!difficulty || cert.difficulty === difficulty) &&
        (!minPrice || priceNum >= parseFloat(minPrice)) &&
        (!maxPrice || priceNum <= parseFloat(maxPrice))
      );
    });
  }, [certifications, search, provider, difficulty, minPrice, maxPrice]);

  // Call parent on filter change
  useMemo(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  return (
    <>
      <div className="w-full md:hidden flex flex-col items-center">
        {/* Remove flex-1 for better spacing */}
        <button
          type="button"
          className="w-full px-4 py-2 rounded bg-[#10B981] text-white font-bold"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>
        {mobileOpen && (
          <div className="bg-white dark:bg-[#232323] rounded-lg shadow p-4 mt-2 flex flex-col gap-4 w-full">
            <div className="flex flex-col items-center w-full">
              <label className="block text-[#1e1e1e] dark:text-white text-center w-full">Search</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <label className="block text-[#1e1e1e] dark:text-white text-center w-full">Provider</label>
              <select
                value={provider}
                onChange={e => setProvider(e.target.value)}
                className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white"
              >
                <option value="">All Providers</option>
                {providers.filter((p): p is string => typeof p === "string").map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-full">
              <label className="block text-[#1e1e1e] dark:text-white text-center w-full">Difficulty</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white"
              >
                <option value="">All Difficulty</option>
                {difficulties.filter((d): d is string => typeof d === "string").map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-full">
              <label className="block text-[#1e1e1e] dark:text-white text-center w-full">Min Price</label>
              <input
                type="number"
                min={0}
                placeholder="Min price"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <label className="block text-[#1e1e1e] dark:text-white text-center w-full">Max Price</label>
              <input
                type="number"
                min={0}
                placeholder="Max price"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <div className="bg-white dark:bg-[#232323] rounded-lg shadow p-4 mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            >
              <option value="">All Providers</option>
              {providers.filter((p): p is string => typeof p === "string").map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            >
              <option value="">All Difficulty</option>
              {difficulties.filter((d): d is string => typeof d === "string").map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              placeholder="Min price"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <input
              type="number"
              min={0}
              placeholder="Max price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </>
  );
}
