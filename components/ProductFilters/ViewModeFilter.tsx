'use client';

import { useCallback } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useFilters, useFilterActions } from '@/store/product-selectors';

interface ViewModeFilterProps {
  variant: 'compact' | 'full';
}

export default function ViewModeFilter({ variant }: ViewModeFilterProps) {
  const filters = useFilters();
  const { setFilters } = useFilterActions();

  const handleViewModeChange = useCallback(
    (mode: string) => {
      setFilters({
        showOnlyLiked: mode === 'favorites',
      });
    },
    [setFilters]
  );

  if (variant === 'compact') {
    return (
      <div className="flex gap-4 items-center">
        <FunnelIcon className="w-5 h-5 text-gray-400" />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.showOnlyLiked}
            onChange={(e) => setFilters({ showOnlyLiked: e.target.checked })}
            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Только избранные</span>
        </label>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Показать
      </label>
      <select
        value={filters.showOnlyLiked ? 'favorites' : 'all'}
        onChange={(e) => handleViewModeChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="all">Все товары</option>
        <option value="favorites">Только избранные</option>
      </select>
    </div>
  );
}
