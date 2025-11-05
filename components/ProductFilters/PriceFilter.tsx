'use client';

import {
  useFilters,
  useFilteredProducts,
  useFilterActions,
} from '@/store/product-selectors';

import { useMemo, useState } from 'react';

export default function PriceFilter() {
  const filters = useFilters();
  const filteredProducts = useFilteredProducts();

  const { setFilters } = useFilterActions();

  const [editingMinPrice, setEditingMinPrice] = useState<string | null>(null);
  const [editingMaxPrice, setEditingMaxPrice] = useState<string | null>(null);

  const { minProductPrice, maxProductPrice } = useMemo(() => {
    if (filteredProducts.length === 0) {
      return { minProductPrice: 0, maxProductPrice: 0 };
    }
    return {
      minProductPrice: Math.min(...filteredProducts.map((p) => p.price)),
      maxProductPrice: Math.max(...filteredProducts.map((p) => p.price)),
    };
  }, [filteredProducts]);

  // Значения для инпутов
  const minPriceValue =
    editingMinPrice !== null
      ? editingMinPrice
      : filters.minPrice > 0
        ? filters.minPrice.toString()
        : '';

  const maxPriceValue =
    editingMaxPrice !== null
      ? editingMaxPrice
      : filters.maxPrice < Infinity
        ? filters.maxPrice.toString()
        : '';

  const handleMinPriceChange = (value: string) => {
    setEditingMinPrice(value);
  };

  const handleMaxPriceChange = (value: string) => {
    setEditingMaxPrice(value);
  };

  const handleBlur = () => {
    const minInput = editingMinPrice !== null ? editingMinPrice : minPriceValue;
    const maxInput = editingMaxPrice !== null ? editingMaxPrice : maxPriceValue;

    let minPrice = 0;
    let maxPrice = Infinity;

    if (minInput) {
      const value = parseFloat(minInput);
      if (!isNaN(value)) {
        minPrice = Math.max(minProductPrice, Math.min(value, maxProductPrice));
      }
    }

    if (maxInput) {
      const value = parseFloat(maxInput);
      if (!isNaN(value)) {
        maxPrice = Math.max(minProductPrice, Math.min(value, maxProductPrice));
      }
    }

    if (minPrice > 0 && maxPrice < Infinity && minPrice > maxPrice) {
      maxPrice = minPrice;
    }

    setFilters({
      minPrice,
      maxPrice,
    });

    setEditingMinPrice(null);
    setEditingMaxPrice(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">Цена</label>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="number"
            placeholder={`${minProductPrice.toFixed(2)}`}
            value={minPriceValue}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            onBlur={handleBlur}
            min={minProductPrice}
            max={maxProductPrice}
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <span className="text-xs text-gray-500 mt-1 block">от</span>
        </div>
        <div className="flex-1">
          <input
            type="number"
            placeholder={`${maxProductPrice.toFixed(2)}`}
            value={maxPriceValue}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            onBlur={handleBlur}
            min={minProductPrice}
            max={maxProductPrice}
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <span className="text-xs text-gray-500 mt-1 block">до</span>
        </div>
      </div>
    </div>
  );
}
