'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  useAsyncActions,
  useFilteredProducts,
  useLoading,
  useProducts,
  useError,
} from '@/store/product-selectors';

import ProductList from '@/components/ProductList/ProductList';
import ProductFilters from '@/components/ProductFilters/ProductFilters';
import Pagination from '@/components/Pagination/Pagination';

export default function ProductsPage() {
  const filteredProducts = useFilteredProducts();
  const loading = useLoading();

  const error = useError();
  const products = useProducts();

  const { fetchProducts } = useAsyncActions();

  const PRODUCTS_COUNT_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const { validCurrentPage, currentProducts, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(
      filteredProducts.length / PRODUCTS_COUNT_PER_PAGE
    );

    const validCurrentPage =
      currentPage > totalPages ? 1 : Math.max(1, currentPage);

    const startIndex = (validCurrentPage - 1) * PRODUCTS_COUNT_PER_PAGE;
    const currentProducts = filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_COUNT_PER_PAGE
    );
    return { validCurrentPage, currentProducts, totalPages };
  }, [filteredProducts, currentPage, PRODUCTS_COUNT_PER_PAGE]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && products.length === 0) {
      fetchProducts();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <p className="text-gray-600">Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Ошибка загрузки</h3>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={handleRetry}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Все товары</h1>
        <span className="text-gray-600">{filteredProducts.length} товаров</span>
      </div>

      <ProductFilters />
      <ProductList products={currentProducts} />
      <Pagination
        currentPage={validCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
