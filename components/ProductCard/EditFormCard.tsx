'use client';

interface EditFormCardProps {
  editedProduct: {
    title: string;
    description: string;
    price: number;
    images?: string[];
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditFormCard({
  editedProduct,
  handleInputChange,
  handleImageChange,
}: EditFormCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <input
        type="text"
        name="title"
        value={editedProduct.title}
        onChange={handleInputChange}
        className="font-semibold text-lg mb-2 p-1 border border-gray-300 rounded"
        onClick={handleClick}
      />
      <textarea
        name="description"
        value={editedProduct.description}
        onChange={handleInputChange}
        rows={3}
        className="text-gray-600 text-sm mb-4 p-1 border border-gray-300 rounded flex-1 resize-none"
        onClick={handleClick}
      />
      <div className="mb-3">
        <label className="text-sm text-gray-600 block mb-1">
          URL изображения:
        </label>
        <input
          type="text"
          value={editedProduct.images?.[0] || ''}
          onChange={handleImageChange}
          className="w-full p-1 border border-gray-300 rounded text-sm"
          onClick={handleClick}
        />
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Цена:</label>
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            step="0.01"
            className="w-24 p-1 border border-gray-300 rounded text-sm"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
