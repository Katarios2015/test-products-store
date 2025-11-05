'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProducts, useProductActions } from '@/store/product-selectors';
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { Product } from '@/types/product';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const products = useProducts();
  const { toggleLike } = useProductActions();

  const productId = parseInt(params.id as string);
  const product = products.find((product: Product) => product.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Товар не найден
        </h1>
        <button
          onClick={() => router.push('/products')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Вернуться к товарам
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.push('/products')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Назад к товарам
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={
                product?.images ? product?.images[0] : '/images/placeholder.jpg'
              }
              width={500}
              height={500}
              alt={product.title}
              className="w-full h-96 md:h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
              <button
                onClick={() => toggleLike(product.id)}
                className={`p-2 rounded-full transition-colors ${
                  product.isLiked
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                {product.isLiked ? (
                  <HeartSolid className="w-8 h-8" />
                ) : (
                  <HeartIcon className="w-8 h-8" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-green-700">
                ${product.price}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {product.category.name}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Описание
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">ID товара:</span>
                  <p className="font-medium">{product.id}</p>
                </div>
                <div>
                  <span className="text-gray-500">Статус:</span>
                  <p className="font-medium">
                    {product.isLiked ? 'В избранном' : 'Не в избранном'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
