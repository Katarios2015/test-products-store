import { StateCreator } from 'zustand';
import { ProductFilters, Product } from '@/types/product';
import { StoreState, FilterSlice } from './types';

const applyFilters = (
  products: Product[],
  filters: ProductFilters
): Product[] => {
  const isFiltersEmpty =
    !filters.showOnlyLiked &&
    !filters.searchQuery &&
    !filters.category &&
    filters.minPrice === 0 &&
    filters.maxPrice === Infinity &&
    filters.minRating === 0;

  if (isFiltersEmpty) {
    return products;
  }

  let filtered = products;

  if (filters.showOnlyLiked) {
    filtered = filtered.filter((product) => product.isLiked);
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.name.toLowerCase().includes(query)
    );
  }

  if (filters.category) {
    filtered = filtered.filter(
      (product) =>
        product.category.name.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.minPrice > 0 || filters.maxPrice < Infinity) {
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );
  }

  if (filters.minRating > 0) {
    filtered = filtered.filter(
      (product) => product.rating.rate >= filters.minRating
    );
  }

  return filtered;
};

export const createFilterSlice: StateCreator<
  StoreState,
  [],
  [],
  FilterSlice
> = (set, get) => ({
  filters: {
    showOnlyLiked: false,
    searchQuery: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity,
    minRating: 0,
  },
  filteredProducts: [],

  setFilters: (newFilters) => {
    const { products } = get();
    const updatedFilters = { ...get().filters, ...newFilters };
    const filteredProducts = applyFilters(products, updatedFilters);

    set({
      filters: updatedFilters,
      filteredProducts,
    });
  },

  resetFilters: () => {
    const { products } = get();
    const resetFilters = {
      showOnlyLiked: false,
      searchQuery: '',
      category: '',
      minPrice: 0,
      maxPrice: Infinity,
      minRating: 0,
    };
    const filteredProducts = applyFilters(products, resetFilters);

    set({
      filters: resetFilters,
      filteredProducts,
    });
  },

  applyFiltersToProducts: (products: Product[]) => {
    const { filters } = get();
    const filteredProducts = applyFilters(products, filters);
    set({ filteredProducts });
  },
});
