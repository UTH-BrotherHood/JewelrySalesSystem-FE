"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import http from "@/utils/http";
import Cookies from "js-cookie";
import Image from "next/image";

interface ProductFormData {
  categoryId: string;
  name: string;
  description: string;
  costPrice: string;
  weight: number;
  laborCost: number;
  stoneCost: number;
  stockQuantity: number;
  imageUrl: string;
}

interface Category {
  categoryId: string;
  categoryName: string;
}

export default function EditProductPage() {
  const { productsId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, setValue, control, watch } =
    useForm<ProductFormData>();
  const imageUrl = watch("imageUrl");

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const token = Cookies.get("token");
        const [productResponse, categoriesResponse] = await Promise.all([
          http.get(`/products/${productsId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          http.get("/categories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const product = (productResponse.data as any).result;
        setCategories((categoriesResponse.data as any).result.content);

        if (product) {
          Object.keys(product).forEach((key) => {
            setValue(key as keyof ProductFormData, product[key]);
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          description:
            "Unable to load product or category information. Please try again later.",
        });
      }
    };

    fetchProductAndCategories();
  }, [productsId, setValue, toast]);

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.patch(`/products/${productsId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Product updated successfully" });
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast({ description: "Failed to update product. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="categoryId" className="block mb-2">
            Category
          </label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2">
            Product Name
          </label>
          <Input id="name" {...register("name", { required: true })} />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <Textarea id="description" {...register("description")} />
        </div>
        <div>
          <label htmlFor="costPrice" className="block mb-2">
            Giá vốn
          </label>
          <Input
            type="text"
            id="costPrice"
            {...register("costPrice", {
              required: true,
              pattern: /^\d*\.?\d*$/,
            })}
          />
        </div>
        <div>
          <label htmlFor="weight" className="block mb-2">
            Trọng lượng
          </label>
          <Input
            type="text"
            id="weight"
            {...register("weight", {
              required: true,
              pattern: /^\d*\.?\d*$/,
            })}
          />
        </div>
        <div>
          <label htmlFor="laborCost" className="block mb-2">
            Chi phí nhân công
          </label>
          <Input
            type="text"
            id="laborCost"
            {...register("laborCost", {
              required: true,
              pattern: /^\d*\.?\d*$/,
            })}
          />
        </div>
        <div>
          <label htmlFor="stoneCost" className="block mb-2">
            Chi phí đá quý
          </label>
          <Input
            type="text"
            id="stoneCost"
            {...register("stoneCost", {
              required: true,
              pattern: /^\d*\.?\d*$/,
            })}
          />
        </div>
        <div>
          <label htmlFor="stockQuantity" className="block mb-2">
            Stock Quantity
          </label>
          <Input
            type="number"
            id="stockQuantity"
            {...register("stockQuantity", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-2">
            Image URL
          </label>
          <Input id="imageUrl" {...register("imageUrl")} />
        </div>
        {imageUrl && (
          <div className="mt-4">
            <Image
              src={
                imageUrl.startsWith("http") ? imageUrl : "/default-image.jpg"
              }
              alt="Product image"
              width={200}
              height={200}
              className="object-cover rounded"
            />
          </div>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
