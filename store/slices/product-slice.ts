import { StateCreator } from 'zustand';
import { Product } from '@/types/product';
import { StoreState, ProductSlice } from './types';

export const createProductSlice: StateCreator<
  StoreState,
  [],
  [],
  ProductSlice
> = (set, get) => ({
  products: [],

  setProducts: (products) => {
    set({ products });
    get().applyFiltersToProducts(products);
  },

  toggleLike: (id) => {
    const { products, applyFiltersToProducts } = get();
    const newProducts = products.map((product) =>
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    );
    set({ products: newProducts });
    applyFiltersToProducts(newProducts);
  },

  deleteProduct: (id) => {
    const { products, applyFiltersToProducts } = get();
    const newProducts = products.filter((product) => product.id !== id);
    set({ products: newProducts });
    applyFiltersToProducts(newProducts);
  },

  addProduct: (newProduct) => {
    const { products, applyFiltersToProducts } = get();

    const generateId = () => {
      if (products.length === 0) return 1;
      const maxId = Math.max(...products.map((p) => p.id));
      return maxId + 1;
    };

    const productToAdd: Product = {
      ...newProduct,
      price: Number(newProduct.price),
      id: generateId(),
      isLiked: false,
      rating: {
        rate: Math.floor(Math.random() * 6),
        count: Math.floor(Math.random() * 10),
      },
    };

    const newProducts = [...products, productToAdd];
    set({ products: newProducts });
    applyFiltersToProducts(newProducts);
  },

  editProduct: (id, updatedFields) => {
    const { products, applyFiltersToProducts } = get();
    const newProducts = products.map((product) =>
      product.id === id
        ? {
            ...product,
            ...updatedFields,
            id: product.id,
            rating: product.rating,
            category: product.category,
            isLiked: product.isLiked,
          }
        : product
    );
    set({ products: newProducts });
    applyFiltersToProducts(newProducts);
  },

  clearStorage: () => {
    const { resetFilters } = get();
    set({ products: [] });
    resetFilters();
  },
});
