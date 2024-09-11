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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import http from "@/utils/http";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Role {
  name: string;
  description: string;
  permissions: any[];
}

interface Employee {
  employeeId: string;
  name: string;
  username: string;
  roles: Role[];
  phoneNumber: string;
}

interface EmployeeResponse {
  code: number;
  message: string;
  result: Employee[];
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await http.get<EmployeeResponse>("/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && Array.isArray(response.data.result)) {
          setEmployees(response.data.result);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error loading employees:", error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, [token]);

  const deleteEmployee = async (employeeId: string) => {
    try {
      await http.delete(`/employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.employeeId !== employeeId)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl">Employees</h1>
      <div className="flex justify-end mb-3">
        <Button className="ml-auto bg-buttonBlue">
          <IconPlus />
          <Link href="/dashboard/employees/create">Add Employee</Link>
        </Button>
      </div>
      <Table className="bg-white rounded-md shadow-md">
        <TableCaption>A list of employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.employeeId}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.username}</TableCell>
                <TableCell>
                  {employee.roles.map((role) => role.name).join(", ")}
                </TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell className="flex text-xs justify-center items-center gap-2">
                  <Link
                    href={`/dashboard/employees/${employee.employeeId}/edit`}
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
                          Are you sure you want to delete this employee?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteEmployee(employee.employeeId)}
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
              <TableCell colSpan={5} className="text-center">
                No employees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
