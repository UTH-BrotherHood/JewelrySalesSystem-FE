import http from "@/utils/http";
import { FetchProductsOptions, FetchProductsResponse } from "@/types/productTypes";

export const fetchProducts = async ({
  page,
  limit,
  search,
  minCostPrice,
  maxCostPrice,
  sortBy,
  sortOrder,
  categoryId,
}: FetchProductsOptions): Promise<FetchProductsResponse> => {
  try {
    const config = {
      params: {
        page,
        size: limit,
        name: search,
        minCostPrice,
        maxCostPrice,
        sortBy,
        sortOrder,
        categoryId,
      },
    };

    const response = await http.get<FetchProductsResponse>("/products", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};
