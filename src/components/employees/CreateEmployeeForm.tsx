"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { createEmployee } from "@/api/employeeApis";

interface EmployeeFormData {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export function CreateEmployeeForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<EmployeeFormData>();

  const onSubmit = async (data: EmployeeFormData) => {
    setLoading(true);
    try {
      await createEmployee({
        ...data,
        roles: ["Employee"], // Set cứng role là "Employee"
      });
      toast({ description: "Employee created successfully" });
      router.push("/dashboard/employees");
    } catch (error) {
      console.error("Error creating employee:", error);
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
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <Input id="name" {...register("name", { required: true })} />
        </div>
        <div>
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <Input id="username" {...register("username", { required: true })} />
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
          <label htmlFor="phone" className="block mb-2">
            Phone Number
          </label>
          <Input id="phone" {...register("phoneNumber", { required: true })} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Employee"}
        </Button>
      </form>
    </div>
  );
}
