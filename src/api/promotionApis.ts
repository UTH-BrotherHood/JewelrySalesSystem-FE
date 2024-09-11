import http from "@/utils/http";
import Cookies from "js-cookie";
import { Promotion } from "@/types/cartTypes";

export const fetchPromotion = async (
  couponCode: string
): Promise<Promotion> => {
  try {
    const token = Cookies.get("token");
    if (token) {
      http.setToken(token); 
    }
    const response = await http.get<Promotion>(`/promotions/${couponCode}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching promotion:", error);
    throw error;
  }
};
