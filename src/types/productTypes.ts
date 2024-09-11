export interface FetchProductsOptions {
  page?: number;
  limit?: number;
  search?: string;
  minCostPrice?: number | null;
  maxCostPrice?: number | null;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  categoryId?: string | null;
}

export interface IProduct {
  imageUrl: string | undefined;
  productId?: string;
  category_id: string;
  name: string;
  description: string;
  discount: number;
  images: string[];
  stock: number;
  costPrice: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface FetchProductsResponse {
  result: {
    content: IProduct[]; // List of products
    totalPages: number; // Total number of pages
    totalItems: number; // Total number of items
  };
}