import { useState } from 'react';

type FilterMenuProps = {
  onFilterChange: (filters: { startDate?: string; endDate?: string; sort?: string; search?: string }) => void;
};

export default function FilterMenu({ onFilterChange }: FilterMenuProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg p-6 mt-8 mb-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-[#1e1e1e] dark:text-white text-center">Filter Posts</h2>
      {/* Mobile: Dropdown */}
      <div className="w-full md:hidden flex flex-col justify-end">
        <div className="flex-1" />
        <button
          type="button"
          className="w-full px-4 py-2 rounded bg-[#10B981] text-white font-bold"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>
        {mobileOpen && (
          <div className="bg-white dark:bg-[#232323] rounded-lg shadow p-4 mt-2 flex flex-col gap-4 w-full">
            <div className="flex flex-col items-center">
              <label className="block text-[#1e1e1e] dark:text-white text-center">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  onFilterChange({ startDate, endDate, sort, search: e.target.value });
                }}
                placeholder="Search by name or description..."
                className="px-4 py-2 rounded border-2 border-white dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] w-full bg-white dark:bg-[#18181b] text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block text-[#1e1e1e] dark:text-white text-center">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  onFilterChange({ startDate: e.target.value, endDate, sort, search });
                }}
                className="border dark:bg-[#1e1e1e] dark:text-white rounded px-4 py-2 w-full text-[#1e1e1e]"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block dark:bg-[#1e1e1e] dark:text-white text-[#1e1e1e] text-center">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  onFilterChange({ startDate, endDate: e.target.value, sort, search });
                }}
                className="border dark:bg-[#1e1e1e] dark:text-white rounded px-4 py-2 w-full text-[#1e1e1e]"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block dark:bg-[#1e1e1e] dark:text-white text-[#1e1e1e] text-center">Sort By</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  onFilterChange({ startDate, endDate, sort: e.target.value, search });
                }}
                className="border dark:bg-[#1e1e1e] dark:text-white rounded px-4 py-2 w-full text-[#1e1e1e]"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {/* Desktop: Always visible */}
      <div className="hidden md:flex flex-col w-full">
        <div className="flex flex-row space-x-4 w-full justify-center">
          <div className="flex flex-col items-center">
            <label className="block text-[#1e1e1e] dark:text-white text-center">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onFilterChange({ startDate, endDate, sort, search: e.target.value });
              }}
              placeholder="Search by name or description..."
              className="border dark:bg-[#1e1e1e] dark:text-white rounded px-4 py-2 w-48 text-[#1e1e1e]"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="block text-[#1e1e1e] dark:text-white text-center">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                onFilterChange({ startDate: e.target.value, endDate, sort, search });
              }}
              className="border dark:bg-[#1e1e1e] dark:text-white rounded px-4 py-2 w-48 text-[#1e1e1e]"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="block dark:bg-[#1e1e1e] dark:text-white text-[#1e1e1e] text-center">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                onFilterChange({ startDate, endDate: e.target.value, sort, search });
              }}
              className="border dark:bg-[#1e1e1e] dark:text-white rounded px-4 py-2 w-48 text-[#1e1e1e]"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="block dark:bg-[#1e1e1e] dark:text-white text-[#1e1e1e] text-center">Sort By</label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                onFilterChange({ startDate, endDate, sort: e.target.value, search });
              }}
              className="border dark:bg-[#1e1e1e] dark:text-white rounded px-4 py-2 w-48 text-[#1e1e1e]"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
