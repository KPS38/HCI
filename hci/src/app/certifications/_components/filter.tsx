import { useState, useMemo } from "react";
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

  // Filtering logic
  const filtered = useMemo(() => {
    return certifications.filter(cert => {
      const priceNum = getPriceNum(cert.price);
      return (
        (!search || cert.name.toLowerCase().includes(search.toLowerCase())) &&
        (selectedProviders.length === 0 || selectedProviders.includes(cert.provider)) &&
        (selectedDifficulties.length === 0 || selectedDifficulties.includes(cert.difficulty)) &&
        (!minPrice || priceNum >= parseFloat(minPrice)) &&
        (!maxPrice || priceNum <= parseFloat(maxPrice))
      );
    });
  }, [certifications, search, selectedProviders, selectedDifficulties, minPrice, maxPrice]);

  // Call parent on filter change
  useMemo(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  // Slider logic for two thumbs
  const sliderMin = priceRange.min;
  const sliderMax = priceRange.max;
  const sliderStep = Math.max(1, Math.round((sliderMax - sliderMin) / 20));
  const sliderValueMin = minPrice !== "" ? Number(minPrice) : sliderMin;
  const sliderValueMax = maxPrice !== "" ? Number(maxPrice) : sliderMax;

  // Ensure min <= max
  function handleSliderMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.min(Number(e.target.value), sliderValueMax);
    setMinPrice(val.toString());
  }
  function handleSliderMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.max(Number(e.target.value), sliderValueMin);
    setMaxPrice(val.toString());
  }

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

  // Slider ticks
  function getTicks() {
    const ticks = [];
    const count = 4;
    for (let i = 0; i <= count; i++) {
      const v = Math.round(sliderMin + ((sliderMax - sliderMin) * i) / count);
      ticks.push(v);
    }
    return ticks;
  }

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
      <div className="w-full md:hidden flex flex-col items-center mb-6">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-[#10B981] dark:text-[#10B981]">Filter</span>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-[#10B981] text-[#10B981] font-bold shadow hover:bg-[#10B981] hover:text-white transition-colors duration-200 mb-2"
          style={{
            boxShadow: "0 2px 8px 0 rgba(16,185,129,0.08)",
            letterSpacing: "0.01em",
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
          <span>Filter</span>
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
                transition: "background 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)",
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
                    min={sliderMin}
                    max={sliderMax}
                    placeholder={sliderMin ? sliderMin.toString() : "Min"}
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                  />
                  <span className="mx-2 text-[#10B981] font-bold">-</span>
                  <input
                    type="number"
                    min={sliderMin}
                    max={sliderMax}
                    placeholder={sliderMax ? sliderMax.toString() : "Max"}
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                  />
                </div>
                {/* Range slider with two thumbs */}
                <div className="w-full flex flex-col items-center mt-2">
                  <div className="relative w-full flex items-center h-8">
                    {/* Left (min) thumb - higher z-index if closer to max, otherwise lower */}
                    <input
                      type="range"
                      min={sliderMin}
                      max={sliderMax}
                      step={sliderStep}
                      value={sliderValueMin}
                      onChange={handleSliderMinChange}
                      className="w-full accent-[#10B981] absolute left-0 top-0"
                      style={{
                        zIndex: sliderValueMin >= sliderValueMax - sliderStep ? 4 : 2,
                        pointerEvents: "auto"
                      }}
                    />
                    {/* Right (max) thumb - higher z-index if closer to min, otherwise lower */}
                    <input
                      type="range"
                      min={sliderMin}
                      max={sliderMax}
                      step={sliderStep}
                      value={sliderValueMax}
                      onChange={handleSliderMaxChange}
                      className="w-full accent-[#10B981] absolute left-0 top-0"
                      style={{
                        zIndex: sliderValueMax > sliderValueMin + sliderStep ? 3 : 5,
                        pointerEvents: "auto"
                      }}
                    />
                  </div>
                  {/* Ticks */}
                  <div className="flex justify-between w-full mt-2 text-xs font-semibold text-black dark:text-white">
                    {getTicks().map((tick, i) => (
                      <span key={i} className="w-6 text-center">{tick}</span>
                    ))}
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
      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <div className="bg-white dark:bg-[#232323] rounded-lg shadow p-4 mb-8 flex flex-col gap-4">
          <span className="text-2xl font-bold text-[#10B981] dark:text-[#10B981] mb-2">Filter</span>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
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
            <div className="flex flex-col items-start w-full mb-2">
              <label className="block text-[#1e1e1e] dark:text-white mb-1">Price Range</label>
              <div className="flex items-center gap-2 w-full mb-2">
                <input
                  type="number"
                  min={sliderMin}
                  max={sliderMax}
                  placeholder={sliderMin ? sliderMin.toString() : "Min"}
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                />
                <span className="mx-2 text-[#10B981] font-bold">-</span>
                <input
                  type="number"
                  min={sliderMin}
                  max={sliderMax}
                  placeholder={sliderMax ? sliderMax.toString() : "Max"}
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-1/2 px-4 py-2 rounded border-2 border-gray-300 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white dark:bg-[#18181b] text-black dark:text-white"
                />
              </div>
              {/* Range slider with two thumbs */}
              <div className="w-full flex flex-col items-center mt-2">
                <div className="relative w-full flex items-center h-8">
                  {/* Left (min) thumb */}
                  <input
                    type="range"
                    min={sliderMin}
                    max={sliderMax}
                    step={sliderStep}
                    value={sliderValueMin}
                    onChange={handleSliderMinChange}
                    className="w-full accent-[#10B981] absolute left-0 top-0"
                    style={{
                      zIndex: sliderValueMin >= sliderValueMax - sliderStep ? 4 : 2,
                      pointerEvents: "auto",
                      clipPath: 'inset(0 0 0 0)', // Ensure no clipping of thumbs
                    }}
                  />
                  {/* Right (max) thumb */}
                  <input
                    type="range"
                    min={sliderMin}
                    max={sliderMax}
                    step={sliderStep}
                    value={sliderValueMax}
                    onChange={handleSliderMaxChange}
                    className="w-full accent-[#10B981] absolute left-0 top-0"
                    style={{
                      zIndex: sliderValueMax > sliderValueMin + sliderStep ? 3 : 5,
                      pointerEvents: "auto",
                      clipPath: 'inset(0 0 0 0)', // Same for right thumb
                    }}
                  />
                </div>
                {/* Ticks */}
                <div className="flex justify-between w-full mt-2 text-xs font-semibold text-black dark:text-white">
                  {getTicks().map((tick, i) => (
                    <span key={i} className="w-6 text-center">{tick}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}