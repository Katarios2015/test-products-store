'use client';

import { useCallback } from 'react';
import { useFilterActions } from '@/store/product-selectors';

interface ClearFiltersButtonProps {
  onClear?: () => void;
}

export default function ClearFiltersButton({
  onClear,
}: ClearFiltersButtonProps) {
  const { setFilters } = useFilterActions();

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      showOnlyLiked: false,
      category: '',
      minPrice: 0,
      maxPrice: Infinity,
      minRating: 0,
    });

    onClear?.();
  }, [setFilters, onClear]);

  return (
    <button
      onClick={clearFilters}
      className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
    >
      <span>Сбросить все фильтры</span>
    </button>
  );
}
