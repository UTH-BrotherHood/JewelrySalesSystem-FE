"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import http from "@/utils/http";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

interface CustomerFormData {
  email: string;
  customername: string;
  password: string;
  address: string;
  phone: string;
}

export function CreateCustomerForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<CustomerFormData>();

  const onSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.post("/customers", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Customer created successfully" });
      router.push("/dashboard/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast({ description: error.response.data.message });
      } else {
        toast({ description: "An unknown error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
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
          <label htmlFor="customername" className="block mb-2">
            Customer Name
          </label>
          <Input
            id="customername"
            {...register("customername", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-2">
            Address
          </label>
          <Input id="address" {...register("address", { required: true })} />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2">
            Phone Number
          </label>
          <Input id="phone" {...register("phone", { required: true })} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Customer"}
        </Button>
      </form>
    </div>
  );
}
