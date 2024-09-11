import http from "@/utils/http";
import Cookies from "js-cookie";
import { CartResponse, Promotion } from "@/types/cartTypes";

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
