import http from "@/utils/http";
import Cookies from "js-cookie";
import { CartResponse, PaymentMethod, Promotion } from "@/types/cartTypes";

export const fetchCart = async (employeeId: string): Promise<CartResponse> => {
  try {
    const token = Cookies.get("token"); 
    if (token) {
      http.setToken(token); 
    }
    const response = await http.get<CartResponse>(`cart/${employeeId}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (
  employeeId: string,
  productId: string,
  quantity: number
): Promise<CartResponse> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    const response = await http.post(`/cart/${employeeId}/add`, {
      productId,
      quantity,
    });
    return response.data.result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (
  employeeId: string,
  itemId: string
): Promise<void> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    await http.delete(`/cart/${employeeId}/remove/${itemId}`);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

export const clearCart = async (employeeId: string): Promise<void> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    await http.delete(`/cart/${employeeId}/clear`);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const increaseItemQuantity = async (
  employeeId: string,
  itemId: string
): Promise<void> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    await http.patch(`/cart/${employeeId}/increase/${itemId}`);
  } catch (error) {
    console.error("Error increasing item quantity:", error);
    throw error;
  }
};

export const decreaseItemQuantity = async (
  employeeId: string,
  itemId: string
): Promise<void> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    await http.patch(`/cart/${employeeId}/decrease/${itemId}`);
  } catch (error) {
    console.error("Error decreasing item quantity:", error);
    throw error;
  }
};

export const updateItemQuantity = async (
  employeeId: string,
  itemId: string,
  quantity: number
): Promise<CartResponse> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    const response = await http.patch(`/cart/${employeeId}/update/${itemId}`, {
      quantity,
    });
    return response.data.result; 
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error;
  }
};




export const fetchPromotion = async (
  couponCode: string
): Promise<Promotion> => {
  try {
    const response = await http.get<Promotion>(`/promotions/${couponCode}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching promotion:", error);
    throw error;
  }
};
export const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token);
    }
    const response = await http.get<{ result: PaymentMethod[] }>(
      `/payment-methods`
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};