"use client";
import { fetchCart, addToCart, removeFromCart, increaseItemQuantity, decreaseItemQuantity } from "@/api/cartApis";
import { useAppSelector } from "@/lib/hooks";
import { CartResponse, Promotion } from "@/types/cartTypes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import StepCart from "../cart/StepCart";

const Cart = () => {
  const employeeId = useAppSelector((state: any) => state.employee.employeeId);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);

 

  useEffect(() => {
    if (employeeId) {
      fetchCartData(employeeId);
    }
  }, [employeeId]);

  useEffect(() => {
    if (cart && promotion) {
      const discount = cart.totalAmount * (promotion.discountPercentage / 100);
      setDiscountedTotal(cart.totalAmount - discount);
    }
  }, [cart, promotion]);

  const fetchCartData = async (employeeId: string) => {
    try {
      setLoading(true);
      const cartData = await fetchCart(employeeId);
      setCart(cartData);
    } catch (err: unknown) {
      handleApiError(err, "Error fetching cart data");
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (itemId: string) => {
    try {
      await increaseItemQuantity(employeeId, itemId);
      fetchCartData(employeeId);
    } catch (error) {
      handleApiError(error, "Error increasing quantity");
    }
  };

  const handleDecreaseQuantity = async (itemId: string) => {
    try {
      await decreaseItemQuantity(employeeId, itemId);
      fetchCartData(employeeId);
    } catch (error) {
      handleApiError(error, "Error decreasing quantity");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(employeeId, itemId);
      fetchCartData(employeeId);
    } catch (error) {
      handleApiError(error, "Error removing item");
    }
  };

  const handleApiError = (err: unknown, defaultMsg: string) => {
    let errorMessage = defaultMsg;
    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || defaultMsg;
    }
    setError(errorMessage);
  };

  return (
    <div>
      <StepCart
        cart={cart}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        handleCouponSubmit={() => { }}
        promotion={promotion}
        discountedTotal={discountedTotal}
        goToNextStep={() => { }}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Cart;
