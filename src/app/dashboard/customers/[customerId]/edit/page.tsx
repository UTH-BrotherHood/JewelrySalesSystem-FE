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

interface CustomerFormData {
  email: string;
  phone: string;
  address: string;
}

function EditCustomerPage() {
  const { customerId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<CustomerFormData>();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = Cookies.get("token");
        const response = await http.get(`/customers/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const customer = response.data as {
          result: { email: string; phone: string; address: string };
        };
        setValue("email", customer.result.email);
        setValue("phone", customer.result.phone);
        setValue("address", customer.result.address);
      } catch (error) {
        console.error("Lỗi khi tải thông tin khách hàng:", error);
        toast({
          description:
            "Không thể tải thông tin khách hàng. Vui lòng thử lại sau.",
        });
      }
    };

    fetchCustomer();
  }, [customerId, setValue, toast]);

  const onSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.patch(`/customers/${customerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Cập nhật thông tin khách hàng thành công" });
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Chỉnh sửa Thông tin Khách hàng
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2">
            Số điện thoại
          </label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-2">
            Địa chỉ
          </label>
          <Textarea id="address" {...register("address", { required: true })} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật Thông tin"}
        </Button>
      </form>
    </div>
  );
}

export default EditCustomerPage;
