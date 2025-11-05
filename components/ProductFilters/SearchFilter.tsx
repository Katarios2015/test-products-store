'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useFilters, useFilterActions } from '@/store/product-selectors';

export default function SearchFilter() {
  const filters = useFilters();
  const { setFilters } = useFilterActions();

  return (
    <div className="flex-1 w-full md:max-w-md">
      <div className="relative">
        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск по названию, описанию, категории..."
          value={filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
