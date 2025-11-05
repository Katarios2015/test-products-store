import { Product, ProductFilters } from '@/types/product';

export interface ProductSlice {
  products: Product[];
  setProducts: (products: Product[]) => void;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: Omit<Product, 'id' | 'isLiked' | 'rating'>) => void;
  editProduct: (id: number, updatedFields: Partial<Product>) => void;
  clearStorage: () => void;
}

export interface FilterSlice {
  filters: ProductFilters;
  filteredProducts: Product[];
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  applyFiltersToProducts: (products: Product[]) => void;
}

export interface AsyncSlice {
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export type StoreState = ProductSlice & FilterSlice & AsyncSlice;
