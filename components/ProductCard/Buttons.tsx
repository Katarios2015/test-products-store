'use client';

import {
  HeartIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface ButtonsProps {
  isEditing: boolean;
  product: {
    isLiked: boolean;
  };
  handleActionClick: (
    e: React.MouseEvent,
    handler: (e: React.MouseEvent) => void
  ) => void;
  handleSave: (e: React.MouseEvent) => void;
  handleCancel: (e: React.MouseEvent) => void;
  handleLike: (e: React.MouseEvent) => void;
  handleEditClick: (e: React.MouseEvent) => void;
  handleDelete: (e: React.MouseEvent) => void;
}

export default function Buttons({
  isEditing,
  product,
  handleActionClick,
  handleSave,
  handleCancel,
  handleLike,
  handleEditClick,
  handleDelete,
}: ButtonsProps) {
  if (isEditing) {
    return (
      // Кнопки в режиме редактирования
      <>
        <button
          onClick={(e) => handleActionClick(e, handleSave)}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-green-600 transition-all hover:scale-110 hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 active:scale-95"
          aria-label="Сохранить изменения"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button
          onClick={(e) => handleActionClick(e, handleCancel)}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 transition-all hover:scale-110 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 active:scale-95"
          aria-label="Отменить редактирование"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </>
    );
  }

  return (
    // Кнопки в обычном режиме
    <>
      <button
        onClick={handleLike}
        className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 active:scale-95 ${
          product.isLiked
            ? 'text-red-500 hover:text-red-600 focus-visible:ring-red-500'
            : 'text-gray-600 hover:text-gray-700 focus-visible:ring-gray-500'
        }`}
        aria-label={product.isLiked ? 'Убрать лайк' : 'Добавить лайк'}
      >
        {product.isLiked ? (
          <HeartSolid className="w-5 h-5" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
      </button>
      <button
        onClick={handleEditClick}
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 transition-all hover:scale-110 hover:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95"
        aria-label="Редактировать"
      >
        <PencilSquareIcon className="w-5 h-5" />
      </button>
      <button
        onClick={handleDelete}
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 transition-all hover:scale-110 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 active:scale-95"
        aria-label="Удалить"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </>
  );
}
