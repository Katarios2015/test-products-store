'use client';

import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface ViewContentCardProps {
  product: {
    title: string;
    description: string;
    rating: {
      rate: number;
      count: number;
    };
    price: number;
    category: {
      name: string;
    };
  };
  maxDescriptionLength?: number;
}

export default function ViewContentCard({
  product,
  maxDescriptionLength = 100,
}: ViewContentCardProps) {
  const truncatedDescription =
    product.description.length > maxDescriptionLength
      ? `${product.description.substring(0, maxDescriptionLength)}...`
      : product.description;

  return (
    <>
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
        {truncatedDescription}
      </p>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <StarSolid className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating.rate.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-400">
            ({product.rating.count})
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-green-700 font-bold text-xl">
          ${product.price}
        </span>
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs capitalize">
          {product.category.name}
        </span>
      </div>
    </>
  );
}
