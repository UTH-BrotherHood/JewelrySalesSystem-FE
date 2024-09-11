import { SalesOrderResponse } from "@/types/saleOrderTypes";
import http from "@/utils/http";
import Cookies from "js-cookie";


export const createSalesOrder = async (
  customerId: string,
  employeeId: string,
  cartId: string,
  promotionCode: string,
  paymentMethodId: string
): Promise<SalesOrderResponse> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }

    const requestBody = {
      customerId,
      employeeId,
      cartId,
      promotionCode,
      paymentMethodId,
    };

    const response = await http.post<SalesOrderResponse>(
      "/sales-orders",
      requestBody
    );
    return response.data.result;
  } catch (error) {
    console.error("Error creating sales order:", error);
    throw error;
  }
};
