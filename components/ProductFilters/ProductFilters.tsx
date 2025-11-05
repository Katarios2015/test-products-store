'use client';

import { useFilters, useFilteredProducts } from '@/store/product-selectors';
import {
  getUnidIds,
  getCategories,
} from '@/components/ProductFilters/utils/common';

import SearchFilter from '@/components/ProductFilters/SearchFilter';
import PriceFilter from '@/components/ProductFilters/PriceFilter';
import CategoryFilter from '@/components/ProductFilters/CategoryFilter';
import RatingFilter from '@/components/ProductFilters/RatingFilter';
import ViewModeFilter from '@/components/ProductFilters/ViewModeFilter';
import ClearFiltersButton from '@/components/ProductFilters/ClearFiltersButton';

export default function ProductFilters() {
  const filters = useFilters();
  const filteredProducts = useFilteredProducts();

  const uniqIdCategories = getUnidIds(filteredProducts);
  const categories = getCategories(uniqIdCategories, filteredProducts);

  const hasActiveFilters =
    filters.searchQuery ||
    filters.showOnlyLiked ||
    filters.category ||
    filters.minPrice > 0 ||
    filters.maxPrice < Infinity ||
    filters.minRating > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <SearchFilter />
        <ViewModeFilter variant="compact" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ViewModeFilter variant="full" />
        <CategoryFilter categories={categories} />
        <PriceFilter />
        <RatingFilter />
      </div>
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <ClearFiltersButton />
        </div>
      )}
    </div>
  );
}
