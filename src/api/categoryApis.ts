import { FetchCategoriesOptions } from "@/types/categoryTypes";
import { FetchProductsOptions } from "@/types/productTypes";
import http from "@/utils/http";

export const fetchCategories = async ({ search } : FetchCategoriesOptions)  => {
  try {
    const config = {
      params: {
        categoryName: search,
      },
    };

    const response = await http.get("/categories", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
