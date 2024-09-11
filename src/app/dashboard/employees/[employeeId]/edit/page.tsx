"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface EmployeeFormData {
  name: string;
  username: string;
  phoneNumber: string;
  roles: string[];
}

function EditEmployeePage() {
  const { employeeId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, setValue } =
    useForm<EmployeeFormData>();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = Cookies.get("token");
        const response = await http.get(`/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const employee = response.data as { result: EmployeeFormData };
        setValue("name", employee.result.name);
        setValue("username", employee.result.username);
        setValue("phoneNumber", employee.result.phoneNumber);
        setValue(
          "roles",
          employee.result.roles.map((role: any) => role.name)
        );
      } catch (error) {
        console.error("Error loading employee information:", error);
        toast({
          description:
            "Unable to load employee information. Please try again later.",
        });
      }
    };

    fetchEmployee();
  }, [employeeId, setValue, toast]);

  const onSubmit = async (data: EmployeeFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await http.put(`/employees/${employeeId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ description: "Employee updated successfully" });
      router.push("/dashboard/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({ description: "Failed to update employee. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
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
          <label htmlFor="phoneNumber" className="block mb-2">
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            {...register("phoneNumber", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="roles" className="block mb-2">
            Role
          </label>
          <Controller
            name="roles"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange([value])}
                value={field.value?.[0] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Employee"}
        </Button>
      </form>
    </div>
  );
}

export default EditEmployeePage;
