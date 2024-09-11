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

interface Customer {
  customerId: string;
  customername: string;
  email: string;
  phone: string;
  address: string;
  rewardPoints: number;
  rankLevel: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerResponse {
  code: number;
  message: string;
  result: {
    content: Customer[];
  };
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await http.get<CustomerResponse>("/customers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && Array.isArray(response.data.result)) {
          setCustomers(response.data.result);
        } else {
          setCustomers([]);
        }
      } catch (error) {
        console.error("Error loading customers:", error);
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, [token]);

  const deleteCustomer = async (customerId: string) => {
    try {
      await http.delete(`/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.customerId !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl">Customers</h1>
      <div className="flex justify-end mb-3">
        <Button className="ml-auto bg-buttonBlue">
          <IconPlus />
          <Link href="/dashboard/customers/create">Add Customer</Link>
        </Button>
      </div>
      <Table className="bg-white rounded-md shadow-md">
        <TableCaption>A list of customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Reward Points</TableHead>
            <TableHead>Rank Level</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <TableRow key={customer.customerId}>
                <TableCell className="font-medium">
                  {customer.customername}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.rewardPoints}</TableCell>
                <TableCell>{customer.rankLevel}</TableCell>
                <TableCell className="flex text-xs justify-center items-center gap-2">
                  <Link
                    href={`/dashboard/customers/${customer.customerId}/edit`}
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
                          Are you sure you want to delete this customer?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCustomer(customer.customerId)}
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
              <TableCell colSpan={7} className="text-center">
                No customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
