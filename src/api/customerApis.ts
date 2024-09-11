import { Customer, CustomerRespone } from "@/types/customerTypes";
import http from "@/utils/http";
import Cookies from "js-cookie";


// Fetch customer by name
export const fetchCustomerByPhone = async (
  phone: string
): Promise<CustomerRespone > => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    const response = await http.get<CustomerRespone>(
      `/customers/by-phone?phone=${phone}`
    );

    // Assuming that the API returns an array of customers, even if only one is found
    return response.data;
  } catch (error) {
    console.error("Error fetching customer by name:", error);
    throw error;
  }
};

// Create a new customer
export const createCustomer = async (customerData: Partial<Customer>): Promise<Customer> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    const response = await http.post<{ result: Customer }>("/customers", customerData);
    return response.data.result;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};
