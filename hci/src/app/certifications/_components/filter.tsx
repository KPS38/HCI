import { useState, useMemo, useEffect } from "react";
import { Range } from 'react-range';
import type { Certification } from "../_lib/api";

type FilterProps = {
  certifications: Certification[];
  onFiltered: (filtered: Certification[]) => void;
};

const getUnique = (arr: Certification[], key: keyof Certification) =>
  Array.from(new Set(arr.map(item => item[key])));

function getPriceNum(price: string | number) {
  return typeof price === "string" ? parseFloat(price.replace(/[^\d.]/g, "")) : price;
}

export default function CertificationFilter({ certifications, onFiltered }: FilterProps) {
  const [search, setSearch] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Unique values for checkboxes
  const providers = useMemo(() => getUnique(certifications, "provider"), [certifications]);
  const difficulties = useMemo(() => getUnique(certifications, "difficulty"), [certifications]);

  // Find min and max price among products
  const priceRange = useMemo(() => {
    const prices = certifications.map(cert => getPriceNum(cert.price)).filter(p => !isNaN(p));
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;
    return { min, max };
  }, [certifications]);

  // Filtering logic (works for both mobile and desktop)
  const filtered = useMemo(() => {
    return certifications.filter(cert => {
      const priceNum = getPriceNum(cert.price);
      const certProvider = (cert.provider ?? "").toLowerCase().trim();
      const certDifficulty = (cert.difficulty ?? "").toLowerCase().trim();
      const providerMatch =
        selectedProviders.length === 0 ||
        selectedProviders.some(
          p => certProvider === p.toLowerCase().trim()
        );
      const difficultyMatch =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.some(
          d => certDifficulty === d.toLowerCase().trim()
        );
      return (
        (!search || cert.name.toLowerCase().includes(search.toLowerCase())) &&
        providerMatch &&
        difficultyMatch &&
        (!minPrice || priceNum >= parseFloat(minPrice)) &&
        (!maxPrice || priceNum <= parseFloat(maxPrice))
      );
    });
  }, [certifications, search, selectedProviders, selectedDifficulties, minPrice, maxPrice]);

  // Call parent on filter change (works for both views)
  useMemo(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  // Checkbox handlers
  function handleProviderChange(provider: string) {
    setSelectedProviders(prev =>
      prev.includes(provider) ? prev.filter(p => p !== provider) : [...prev, provider]
    );
  }
  function handleDifficultyChange(difficulty: string) {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    );
  }

  const [rangeValues, setRangeValues] = useState<[number, number]>([priceRange.min, priceRange.max]);

  // Only update slider values when priceRange changes, not when minPrice/maxPrice change
  useEffect(() => {
    setRangeValues([
      minPrice !== "" ? Number(minPrice) : priceRange.min,
      maxPrice !== "" ? Number(maxPrice) : priceRange.max,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange.min, priceRange.max]);

  // When slider changes, update minPrice/maxPrice
  const handleRangeChange = (values: number[]) => {
    setRangeValues([values[0], values[1]]);
    setMinPrice(values[0].toString());
    setMaxPrice(values[1].toString());
  };

  // Checkbox group UI
  function CheckboxGroup({
    label,
    options,
    selected,
    onChange,
  }: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (val: string) => void;
  }) {
    return (
      <div className="flex flex-col items-start w-full mb-2">
        <label className="block text-[#1e1e1e] dark:text-white mb-1">{label}</label>
        <div className="flex flex-wrap gap-2">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                className="accent-[#10B981] rounded border-gray-300 dark:border-gray-600"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile filter button and modal */}
      <div className="w-full md:hidden flex flex-row items-center mb-6">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-[#10B981] font-bold shadow hover:bg-[#10B981] hover:text-white transition-colors duration-200 text-lg
            bg-white text-[#10B981] dark:bg-[#232323] dark:text-white"
          style={{
            boxShadow: "0 2px 8px 0 rgba(16,185,129,0.08)",
            letterSpacing: "0.01em",
            minWidth: "100px",
            height: "48px",
          }}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ minWidth: 20 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="ml-2">Filter</span>
        </button>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 flex"
            style={{ pointerEvents: "auto" }}
          >
            {/* Overlay with transition */}
            <div
              className="flex-1 bg-black bg-opacity-40 transition-all duration-300"
              style={{
                transition: "background 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)",
                opacity: mobileOpen ? 1 : 0,
              }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Slide-in filter panel */}
            <div
              className="w-[90vw] max-w-md h-full bg-white dark:bg-[#232323] rounded-l-lg shadow-lg p-4 flex flex-col gap-4 m-0 animate-slide-in-right"
              style={{
                animation: "slideInRight 0.7s cubic-bezier(0.4,0,0.2,1)",
                position: "relative",
                right: 0,
              }}
            >
              <div className="mb-4">
                <span className="text-xl font-bold text-[#10B981] dark:text-[#10B981]">Filter</span>
              </div>
              <div className="flex flex-col items-start w-full mb-2">
                <label className="block text-[#1e1e1e] dark:text-white mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              <CheckboxGroup
                label="Provider"
                options={providers.filter((p): p is string => typeof p === "string")}
                selected={selectedProviders}
                onChange={handleProviderChange}
              />
              <CheckboxGroup
                label="Difficulty"
                options={difficulties.filter((d): d is string => typeof d === "string")}
                selected={selectedDifficulties}
                onChange={handleDifficultyChange}
              />
              {/* Price Range */}
              <div className="flex flex-col items-start w-full mb-2">
                <label className="block text-[#1e1e1e] dark:text-white mb-1">Price Range</label>
                <div className="flex items-center gap-2 w-full mb-2">
                  <input
                    type="number"
                    min={priceRange.min}
                    max={priceRange.max}
                    placeholder={priceRange.min ? priceRange.min.toString() : "Min"}
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                  />
                  <span className="mx-2 text-[#10B981] font-bold">-</span>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={priceRange.max}
                    placeholder={priceRange.max ? priceRange.max.toString() : "Max"}
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                  />
                </div>
                {/* Two-thumb slider using react-range */}
                <div className="w-full flex flex-col items-center mt-2">
                  <Range
                    step={1}
                    min={priceRange.min}
                    max={priceRange.max}
                    values={rangeValues}
                    onChange={handleRangeChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          background: 'linear-gradient(to right, #e5e7eb, #10B981, #e5e7eb)',
                          borderRadius: '4px',
                          position: 'relative',
                        }}
                        className="my-2"
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, index }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '24px',
                          width: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                          border: '2px solid #fff',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          zIndex: 10,
                          cursor: "pointer",
                        }}
                        aria-label={index === 0 ? "Minimum price" : "Maximum price"}
                      />
                    )}
                  />
                  <div className="flex justify-between w-full mt-2 text-xs font-semibold text-black dark:text-white">
                    <span>{priceRange.min}</span>
                    <span>{priceRange.max}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="w-full mt-4 bg-[#10B981] text-white font-bold py-2 rounded"
                onClick={() => setMobileOpen(false)}
              >
                Close
              </button>
            </div>
            <style jsx global>{`
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                  opacity: 0.5;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        )}
      </div>
      {/* Desktop: Always visible, uses same filter state and handlers */}
      <div className="hidden md:block">
        <div className="bg-white dark:bg-[#232323] rounded-lg shadow p-4 mb-8 flex flex-col gap-4">
          <span className="text-2xl font-bold text-[#10B981] dark:text-[#10B981] mb-2">Filter</span>
          <div className="flex flex-col gap-4">
            {/* Use same filter UI as mobile modal, but always visible */}
            <div className="flex flex-col items-start w-full mb-2">
              <label className="block text-[#1e1e1e] dark:text-white mb-1">Search</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
            <CheckboxGroup
              label="Provider"
              options={providers.filter((p): p is string => typeof p === "string")}
              selected={selectedProviders}
              onChange={handleProviderChange}
            />
            <CheckboxGroup
              label="Difficulty"
              options={difficulties.filter((d): d is string => typeof d === "string")}
              selected={selectedDifficulties}
              onChange={handleDifficultyChange}
            />
            {/* Price Range */}
            <div className="flex flex-col items-start w-full mb-2">
              <label className="block text-[#1e1e1e] dark:text-white mb-1">Price Range</label>
              <div className="flex items-center gap-2 w-full mb-2">
                <input
                  type="number"
                  min={priceRange.min}
                  max={priceRange.max}
                  placeholder={priceRange.min ? priceRange.min.toString() : "Min"}
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                />
                <span className="mx-2 text-[#10B981] font-bold">-</span>
                <input
                  type="number"
                  min={priceRange.min}
                  max={priceRange.max}
                  placeholder={priceRange.max ? priceRange.max.toString() : "Max"}
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                />
              </div>
              {/* Two-thumb slider using react-range */}
              <div className="w-full flex flex-col items-center mt-2">
                <Range
                  step={1}
                  min={priceRange.min}
                  max={priceRange.max}
                  values={rangeValues}
                  onChange={handleRangeChange}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        background: 'linear-gradient(to right, #e5e7eb, #10B981, #e5e7eb)',
                        borderRadius: '4px',
                        position: 'relative',
                      }}
                      className="my-2"
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, index }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '24px',
                        width: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#10B981',
                        border: '2px solid #fff',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        zIndex: 10,
                        cursor: "pointer",
                      }}
                      aria-label={index === 0 ? "Minimum price" : "Maximum price"}
                    />
                  )}
                />
                <div className="flex justify-between w-full mt-2 text-xs font-semibold text-black dark:text-white">
                  <span>{priceRange.min}</span>
                  <span>{priceRange.max}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}