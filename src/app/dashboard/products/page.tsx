"use client";

import { useCallback, useEffect, useState } from "react";
import { columns } from "@/containers/dashboard/columns";
import { DataTable } from "@/containers/dashboard/data-table";
import http from "@/utils/http";
import Cookies from "js-cookie";
import DefautlProductImg from "@/assets/image/default.jpg";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  productId: string;
  categoryId: string;
  name: string;
  description: string;
  costPrice: number;
  weight: number;
  laborCost: number;
  imageUrl: string;
  stoneCost: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  code: number;
  message: string;
  result: {
    content: Product[];
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    totalElements: number;
    totalPages: number;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      const response = await http.get<ApiResponse>(
        "/products?page=0&size=1000",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data.result.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductDeleted = useCallback(
    (deletedProductId: string) => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== deletedProductId)
      );
      toast({ description: "Product deleted successfully" });
    },
    [toast]
  );

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Products</h2>
          </div>
        </div>
        <DataTable
          data={products.map((product) => ({
            ...product,
            categoryName: product.categoryId,
            // Đảm bảo imageUrl tồn tại, nếu không thì sử dụng một hình ảnh mặc định
            imageUrl:
              product.imageUrl || (DefautlProductImg as unknown as string),
          }))}
          columns={columns}
        />
      </div>
    </>
  );
}
