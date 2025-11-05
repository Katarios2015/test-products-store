'use client';

import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useFilters, useFilterActions } from '@/store/product-selectors';

export default function RatingFilter() {
  const filters = useFilters();
  const { setFilters } = useFilterActions();

  return (
    <div className="flex items-center">
      <label className="flex items-center gap-2 cursor-pointer mt-6">
        <input
          type="checkbox"
          checked={filters.minRating >= 4}
          onChange={(e) => setFilters({ minRating: e.target.checked ? 4 : 0 })}
          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
        />
        <div className="flex items-center gap-1">
          <StarSolid className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-700">Рейтинг выше 4</span>
        </div>
      </label>
    </div>
  );
}
