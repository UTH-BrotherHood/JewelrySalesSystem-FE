import { z } from "zod";

// Schema cho sản phẩm
export const productSchema = z.object({
  productId: z.string().uuid(), // Sử dụng UUID cho productId
  categoryName: z.string(),
  name: z.string(),
  description: z.string(),
  costPrice: z.number(),
  weight: z.number(),
  laborCost: z.number(),
  stoneCost: z.number(),
  stockQuantity: z.number().int(), // Số lượng tồn kho phải là số nguyên
});

export type Product = z.infer<typeof productSchema>;
