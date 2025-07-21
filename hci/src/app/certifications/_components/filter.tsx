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
      {/* Mobile: Dropdown */}
      <div className="md:hidden mb-4 w-full">
        <button
          type="button"
          className="w-full px-4 py-2 rounded bg-[#10B981] text-white font-bold"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>
        {mobileOpen && (
          <div className="bg-white dark:bg-[#232323] rounded-lg shadow p-4 mt-2 flex flex-col gap-4 w-full">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            />
            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            >
              <option value="">All Providers</option>
              {providers.filter((p): p is string => typeof p === "string").map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
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
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            />
            <input
              type="number"
              min={0}
              placeholder="Max price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            />
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
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            />
            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            >
              <option value="">All Providers</option>
              {providers.filter((p): p is string => typeof p === "string").map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
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
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            />
            <input
              type="number"
              min={0}
              placeholder="Max price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
