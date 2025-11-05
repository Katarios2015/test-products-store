import { Product, ProductFilters } from '@/types/product';

export interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: Omit<Product, 'id' | 'isLiked' | 'rating'>) => void;
  editProduct: (id: number, updatedFields: Partial<Product>) => void;
  clearStorage: () => void;
}

export interface FilterState {
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
}

export interface AsyncState {
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export type StoreState = ProductState & FilterState & AsyncState;
