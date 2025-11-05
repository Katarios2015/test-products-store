'use client';
import { useProductActions, useProducts } from '@/store/product-selectors';

export default function StorageManager() {
  const { clearStorage } = useProductActions();
  const products = useProducts();

  return (
    <div className="ml-auto flex items-center">
      <button
        onClick={clearStorage}
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        🗑️ Очистить хранилище
        <span className="ml-2 bg-red-600 px-2 py-1 rounded-full text-xs">
          {products.length}
        </span>
      </button>
    </div>
  );
}
