import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createProductSlice } from './slices/product-slice';
import { createFilterSlice } from './slices/filter-slice';
import { createAsyncSlice } from './slices/async-slice';
import { StoreState } from './slices/types';

export const useProductStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createProductSlice(...a),
      ...createFilterSlice(...a),
      ...createAsyncSlice(...a),
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
      }),
    }
  )
);
