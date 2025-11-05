'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

import Buttons from '@/components/ProductCard/Buttons';
import EditFormCard from '@/components/ProductCard/EditFormCard';
import ViewContentCard from '@/components/ProductCard/ViewContentCard';

interface ProductCardProps {
  product: Product;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedProduct: Partial<Product>) => void;
}

export default function ProductCard({
  product,
  onLike,
  onDelete,
  onEdit,
}: ProductCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleCardClick = () => {
    if (!isEditing) {
      router.push(`/products/${product.id}`);
    }
  };

  const handleActionClick = (
    e: React.MouseEvent,
    action: (e: React.MouseEvent) => void
  ) => {
    e.stopPropagation();
    action(e);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedProduct(product);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(product.id, {
      title: editedProduct.title,
      description: editedProduct.description,
      price: editedProduct.price,
      images: editedProduct.images,
    });
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(product.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditedProduct((prev) => ({
      ...prev,
      images: [value],
    }));
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col relative"
      onClick={handleCardClick}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={product?.images ? product?.images[0] : '/images/placeholder.jpg'}
          alt={product?.title || 'Product'}
          width={200}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {isEditing ? (
          // Режим редактирования
          <EditFormCard
            editedProduct={editedProduct}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
          />
        ) : (
          // Режим просмотра
          <ViewContentCard product={product} />
        )}
      </div>

      {/* Кнопки действий */}
      <div className="absolute top-3 right-3 flex gap-2">
        <Buttons
          isEditing={isEditing}
          product={product}
          handleActionClick={handleActionClick}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleLike={handleLike}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
