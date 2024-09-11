"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import http from "@/utils/http";
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  code: number;
  message: string;
  result: {
    content: Category[];
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const token = Cookies.get("token"); // Get token from cookies

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get<CategoryResponse>("/categories", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        });
        if (response.data && Array.isArray(response.data.result.content)) {
          setCategories(response.data.result.content);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [token]);

  const deleteCategory = async (categoryId: string) => {
    try {
      await http.delete(`/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to delete request
        },
      });
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.categoryId !== categoryId)
      );
    } catch (error) {
      console.error("Lỗi khi xoá danh mục:", error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl">Categories</h1>
      <div className="flex justify-end mb-3">
        <Button className="ml-auto bg-buttonBlue">
          <IconPlus />
          <Link href="/dashboard/categories/create">Add Category</Link>
        </Button>
      </div>
      <Table className="bg-white rounded-md shadow-md">
        <TableCaption>A list of categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[45%]">Category Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.categoryId}>
                <TableCell className="font-medium">
                  {category.categoryName}
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="flex text-xs justify-center items-center gap-2">
                  <Link
                    href={`/dashboard/categories/${category.categoryId}/edit`}
                  >
                    <IconEdit className="w-4" />
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger className="flex items-center gap-2 text-red-500 py-2">
                      <IconTrash className="h-5 w-5" />
                      <span className="hidden group-hover:inline-block transition-all duration-300">
                        Delete
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this category?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCategory(category.categoryId)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Không có danh mục nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
