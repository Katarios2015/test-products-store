'use client';

import { useCallback } from 'react';
import { useFilters, useFilterActions } from '@/store/product-selectors';

interface CategoryFilterProps {
  categories: Array<{ id: number; name: string }>;
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const filters = useFilters();
  const { setFilters } = useFilterActions();

  const handleCategoryChange = useCallback(
    (category: string) => {
      setFilters({ category: category === 'all' ? '' : category });
    },
    [setFilters]
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Категория
      </label>
      <select
        value={filters.category || 'all'}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="all">Все категории</option>
        {categories.map((category) => (
          <option key={category?.id} value={category?.name}>
            {category?.name}
          </option>
        ))}
      </select>
    </div>
  );
}
