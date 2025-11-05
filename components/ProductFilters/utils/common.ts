import { Product } from '@/types/product';

export const getUnidIds = (items: Product[]) => {
  const uniqIds = [...new Set(items.map((item) => item.category.id))];
  return uniqIds;
};

export const getCategories = (
  uniqIdCategories: number[],
  filteredProducts: Product[]
) => {
  return uniqIdCategories
    .map((id) => {
      const product = filteredProducts.find((item) => item.category.id === id);
      return product ? product.category : null;
    })
    .filter((item) => item != null);
};
