export interface ICategory {
  categoryId: string;
  categoryName: string;
  description: string;
}
export interface FetchCategoriesOptions {
  search?: string;
}
