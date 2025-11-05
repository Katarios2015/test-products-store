export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
  isLiked: boolean;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  showOnlyLiked: boolean;
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  images: string;
  category: string;
}
