"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import http from "@/utils/http";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

interface CategoryFormData {
  categoryName: string;
  description: string;
}

export function CreateCategoryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<CategoryFormData>();

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.post("/categories", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Category created successfully" });
      router.push("/dashboard/categories");
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast({ description: error.response.data.message });
      } else {
        toast({ description: "Đã xảy ra lỗi không xác định" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block mb-2">
            Category Name
          </label>
          <Input
            id="categoryName"
            {...register("categoryName", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <Textarea
            id="description"
            {...register("description", { required: true })}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </div>
  );
}
