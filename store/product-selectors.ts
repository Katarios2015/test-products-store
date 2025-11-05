import { useProductStore } from '@/store/useProductStore';
import { useShallow } from 'zustand/react/shallow';

export const useProducts = () => useProductStore((state) => state.products);
export const useFilters = () => useProductStore((state) => state.filters);
export const useLoading = () => useProductStore((state) => state.loading);
export const useError = () => useProductStore((state) => state.error);
export const useFilteredProducts = () =>
  useProductStore((state) => state.filteredProducts);

export const useProductActions = () =>
  useProductStore(
    useShallow((state) => ({
      setProducts: state.setProducts,
      toggleLike: state.toggleLike,
      deleteProduct: state.deleteProduct,
      addProduct: state.addProduct,
      editProduct: state.editProduct,
      clearStorage: state.clearStorage,
    }))
  );

export const useFilterActions = () =>
  useProductStore(
    useShallow((state) => ({
      setFilters: state.setFilters,
      resetFilters: state.resetFilters,
    }))
  );

export const useAsyncActions = () =>
  useProductStore(
    useShallow((state) => ({
      fetchProducts: state.fetchProducts,
    }))
  );

export const useProductCount = () =>
  useProductStore((state) => state.products.length);

export const useFavoriteProducts = () =>
  useProductStore(
    useShallow((state) => state.products.filter((product) => product.isLiked))
  );

export const useProductById = (id: number) =>
  useProductStore(
    useShallow((state) => state.products.find((product) => product.id === id))
  );

export const useProductsData = () =>
  useProductStore(
    useShallow((state) => ({
      products: state.products,
      filteredProducts: state.filteredProducts,
      loading: state.loading,
      error: state.error,
    }))
  );

export const useFilterState = () =>
  useProductStore(
    useShallow((state) => ({
      filters: state.filters,
      filteredProducts: state.filteredProducts,
    }))
  );
