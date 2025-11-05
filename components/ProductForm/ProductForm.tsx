'use client';

import { useForm } from 'react-hook-form';
import { useProductActions, useProducts } from '@/store/product-selectors';

import {
  getUnidIds,
  getCategories,
} from '@/components/ProductFilters/utils/common';
import { ProductFormData } from '@/types/product';

interface ProductFormProps {
  onSuccess: () => void;
  initialData?: ProductFormData;
}

export default function ProductForm({
  onSuccess,
  initialData,
}: ProductFormProps) {
  const { addProduct } = useProductActions();
  const products = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: initialData,
  });

  const uniqIdCategories = getUnidIds(products);
  const categories = getCategories(uniqIdCategories, products);

  const onSubmit = async (data: ProductFormData) => {
    const selectedCategory = categories.find(
      (item) => item?.name === data.category
    );
    // Имитация асинхронной операции
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const productData = {
      ...data,
      price: Number(data.price),
      images: [data.images],
      category: {
        id: selectedCategory?.id || 100,
        name: data.category,
      },
    };
    addProduct(productData);
    console.log(productData);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Название товара *
        </label>
        <input
          type="text"
          id="title"
          {...register('title', {
            required: 'Название обязательно',
            minLength: { value: 3, message: 'Минимум 3 символа' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Введите название товара"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Описание *
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description', {
            required: 'Описание обязательно',
            minLength: { value: 10, message: 'Минимум 10 символов' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Введите описание товара"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Цена ($) *
        </label>
        <input
          type="number"
          id="price"
          step="0.01"
          {...register('price', {
            required: 'Цена обязательна',
            min: { value: 0.01, message: 'Цена должна быть больше 0' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="0.00"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Категория *
        </label>
        <select
          id="category"
          {...register('category', { required: 'Категория обязательна' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Выберите категорию</option>
          {categories
            .filter((category) => category?.id && category?.name)
            .map((category) => (
              <option key={`form-${category?.id}`} value={category?.name}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ссылка на изображение *
        </label>
        <input
          type="url"
          id="image"
          {...register('images', {
            required: 'Ссылка на изображение обязательна',
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Введите корректную ссылку',
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Создание...' : 'Создать товар'}
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 bg-gray-300 text-gray-700         py-3 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
