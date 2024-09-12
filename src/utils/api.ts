// utils/api.ts
import Cookies from "js-cookie";
import http from "@/utils/http";

interface Customer {
  customerId: string;
  customername: string;
}

interface Employee {
  employeeId: string;
  employeeName: string;
}

export const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    const response = await http.get<Customer>(`/customers/${id}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    const response = await http.get<Employee>(`/employees/${id}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};
