"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const CreateProductPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, control, watch } = useForm<ProductFormData>();
  const imageUrl = watch("imageUrl");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = Cookies.get("token");
        const response = await http.get("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories((response.data as any).result.content);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          description: "Unable to load categories. Please try again later.",
        });
      }
    };

    fetchCategories();
  }, [toast]);

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.post("/products", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Product created successfully" });
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({ description: "Failed to create product. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="categoryId" className="block mb-2">
            Category
          </label>
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: true }}
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
            Cost Price
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
            Weight
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
            Labor Cost
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
            Stone Cost
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
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
