"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import http from "@/utils/http";
import Cookies from "js-cookie";

interface CategoryFormData {
  categoryName: string;
  description: string;
}

function EditCategoryPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<CategoryFormData>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = Cookies.get("token");
        const response = await http.get(`/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const category = response.data as {
          result: { categoryName: string; description: string };
        };
        setValue("categoryName", category.result.categoryName);
        setValue("description", category.result.description);
      } catch (error) {
        console.error("Lỗi khi tải thông tin danh mục:", error);
        toast({
          description:
            "Không thể tải thông tin danh mục. Vui lòng thử lại sau.",
        });
      }
    };

    fetchCategory();
  }, [categoryId, setValue, toast]);

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.put(`/categories/${categoryId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Cập nhật danh mục thành công" });
      router.push("/dashboard/categories");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      toast({ description: "Cập nhật danh mục thất bại. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Chỉnh sửa Danh mục</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block mb-2">
            Tên Danh mục
          </label>
          <Input
            id="categoryName"
            {...register("categoryName", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Mô tả
          </label>
          <Textarea id="description" {...register("description")} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật Danh mục"}
        </Button>
      </form>
    </div>
  );
}

export default EditCategoryPage;
