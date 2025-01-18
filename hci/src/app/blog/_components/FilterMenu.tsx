import { useState } from 'react';

type FilterMenuProps = {
  onFilterChange: (filters: { startDate?: string; endDate?: string; sort?: string }) => void;
};

export default function FilterMenu({ onFilterChange }: FilterMenuProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('newest');

  const handleFilterChange = () => {
    onFilterChange({ startDate, endDate, sort });
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg py-6 mt-8 mb-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-[#1e1e1e] text-center">Filter Posts</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center mx-4">
        <div className="flex flex-col items-center">
          <label className="block text-[#1e1e1e] text-center">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-4 py-2 w-48 text-[#1e1e1e]"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="block text-[#1e1e1e] text-center">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-4 py-2 w-48 text-[#1e1e1e]"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="block text-[#1e1e1e] text-center">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-4 py-2 w-48 text-[#1e1e1e]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <button
          onClick={handleFilterChange}
          className="bg-[#10B981] text-white px-4 py-2 mt-4 w-48 rounded"
        >
          Apply Filters
        </button>
    </div>
  );
}
