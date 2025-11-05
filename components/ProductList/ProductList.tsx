'use client';

import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useProductActions } from '@/store/product-selectors';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { toggleLike } = useProductActions();
  const { deleteProduct } = useProductActions();
  const { editProduct } = useProductActions();

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onLike={toggleLike}
          onDelete={deleteProduct}
          onEdit={editProduct}
        />
      ))}
    </div>
  );
}
