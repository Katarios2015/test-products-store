'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm/ProductForm';

export default function CreateProductPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/products');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Создать новый товар
        </h1>
        <p className="text-gray-600">
          Заполните форму ниже чтобы добавить новый товар
        </p>
      </div>

      <ProductForm onSuccess={handleSuccess} />
    </div>
  );
}
