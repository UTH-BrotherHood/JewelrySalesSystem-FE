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
import { getCustomerById, getEmployeeById } from "@/utils/api";

interface Order {
  orderId: string;
  customerId: string;
  employeeId: string;
  cartId: string;
  orderDate: string;
  originalTotalAmount: number;
  discountedTotalAmount: number;
  discountedByRank: number;
  returnPolicy: {
    returnPolicyId: string;
    description: string;
    effectiveDate: string;
    expiryDate: string;
  };
  paymentMethod: {
    paymentMethodId: string;
    paymentMethodName: string;
    details: string;
    active: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

interface OrderResponse {
  code: number;
  message: string;
  result: {
    content: Order[];
  };
}

interface Customer {
  customerId: string;
  customername: string;
}

interface Employee {
  employeeId: string;
  employeeName: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customersMap, setCustomersMap] = useState<Map<string, string>>(new Map());
  const [employeesMap, setEmployeesMap] = useState<Map<string, string>>(new Map());
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await http.get<OrderResponse>("/sales-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && Array.isArray(response.data.result.content)) {
          const fetchedOrders = response.data.result.content;
          setOrders(fetchedOrders);

          // Fetch customer and employee details
          const customerPromises = fetchedOrders.map(order =>
            getCustomerById(order.customerId).then(customer => ({
              id: order.customerId,
              name: customer.customername,
            }))
          );

          const employeePromises = fetchedOrders.map(order =>
            getEmployeeById(order.employeeId).then(employee => ({
              id: order.employeeId,
              name: employee.name,
            }))
          );

          const customerData = await Promise.all(customerPromises);
          const employeeData = await Promise.all(employeePromises);

          const customersMap = new Map(customerData.map(c => [c.id, c.name]));
          const employeesMap = new Map(employeeData.map(e => [e.id, e.name]));

          setCustomersMap(customersMap);
          setEmployeesMap(employeesMap);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [token]);

  const deleteOrder = async (orderId: string) => {
    try {
      await http.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  

  return (
    <div className="w-full">
      <h1 className="text-2xl">Orders</h1>
      <div className="flex justify-end mb-3">
        <Button className="ml-auto bg-buttonBlue">
          <IconPlus />
          <Link href="/dashboard/orders/create">Add Order</Link>
        </Button>
      </div>
      <Table className="bg-white rounded-md shadow-md">
        <TableCaption>A list of orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Employee Name</TableHead>
 
            <TableHead>Order Date</TableHead>
            <TableHead>Original Amount</TableHead>
            <TableHead>Discounted Amount</TableHead>
            <TableHead>Discounted By Rank</TableHead>
            <TableHead>Return Policy</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{customersMap.get(order.customerId) || "Loading..."}</TableCell>
                <TableCell>{employeesMap.get(order.employeeId) || "Loading..."}</TableCell>
          
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{order.originalTotalAmount.toLocaleString()}</TableCell>
                <TableCell>{order.discountedTotalAmount.toLocaleString()}</TableCell>
                <TableCell>{order.discountedByRank.toLocaleString()}</TableCell>
                <TableCell>{order.returnPolicy.description}</TableCell>
                <TableCell>{order.paymentMethod.paymentMethodName}</TableCell>
                <TableCell className="flex text-xs justify-center items-center gap-2">
               
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
                          Are you sure you want to delete this order?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteOrder(order.orderId)}
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
              <TableCell colSpan={11} className="text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
