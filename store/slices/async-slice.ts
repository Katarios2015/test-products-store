import { StateCreator } from 'zustand';
import axios from 'axios';
import { Product } from '@/types/product';
import { StoreState, AsyncSlice } from './types';

export const createAsyncSlice: StateCreator<StoreState, [], [], AsyncSlice> = (
  set,
  get
) => ({
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        'https://api.escuelajs.co/api/v1/products'
      );

      const products: Product[] = response.data.map((item: Product) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        images: item.images,
        category: {
          id: item.category?.id || 0,
          name: item.category?.name || 'Unknown',
        },
        isLiked: false,
        rating: {
          rate: item.rating?.rate || Math.floor(Math.random() * 6),
          count: item.rating?.count || Math.floor(Math.random() * 10),
        },
      }));

      get().setProducts(products);
      set({ loading: false });
    } catch (error) {
      set({ error: 'Ошибка загрузки товаров', loading: false });
    }
  },
});
