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
import { useTheme } from "next-themes"; // Thêm import này

interface CustomerFormData {
  email: string;
  phone: string;
  address: string;
}

function EditCustomerPage() {
  const { productId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<CustomerFormData>();
  const { setTheme } = useTheme(); // Thêm hook useTheme

  // ... (giữ nguyên phần useEffect)

  const onSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.put(`/customers/${productId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Cập nhật thông tin khách hàng thành công" });

      // Thay đổi theme sau khi cập nhật thành công
      const newTheme = Math.random() < 0.5 ? "light" : "dark";
      setTheme(newTheme);

      router.push("/dashboard/customers");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin khách hàng:", error);
      toast({
        description:
          "Cập nhật thông tin khách hàng thất bại. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ... (giữ nguyên phần return)
}

export default EditCustomerPage;
