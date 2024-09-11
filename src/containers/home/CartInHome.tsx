"use client";
import { fetchCart, fetchPromotion } from "@/api/cartApis";
import { createCustomer, fetchCustomerByName } from "@/api/customerApis";
import { useAppSelector } from "@/lib/hooks";
import { CartResponse, Promotion } from "@/types/cartTypes";
import { Customer } from "@/types/customerTypes";
import { formatPrice } from "@/utils/formatPrice";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import StepPayment from "./Invoice";
import StepCart from "../cart/StepCart";
import StepCustomer from "../cart/StepCustomer";
import Invoice from "./Invoice";

const Cart = () => {
  const employeeId = useAppSelector((state: any) => state.employee.employeeId);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [customerLoading, setCustomerLoading] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerError, setCustomerError] = useState<string | null>(null);
  const [showCreateCustomerForm, setShowCreateCustomerForm] = useState<boolean>(false);
  const [newCustomerDetails, setNewCustomerDetails] = useState({
    email: "",
    phone: "",
    address: "",
    customername: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

  const selectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };


  const handleCustomerSubmit = async () => {
    if (customerName) {
      try {
        setCustomerLoading(true);
        const response = await fetchCustomerByName(customerName);

        if ( response.code === 200) {
        
        
          setCustomer(response.result);
          setCustomerError(null); 
          setShowCreateCustomerForm(false); 
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
         
            setCustomerError("Customer not found. Please create a new customer.");
            setShowCreateCustomerForm(true);
          } else {
        
            setCustomerError("An error occurred while fetching the customer.");
          }
        } else {
        
          setCustomerError("An unexpected error occurred.");
        }
      } finally {
        setCustomerLoading(false);
      }
    }
  };

  const handleCreateCustomer = async () => {
    const { email, phone, address, customername } = newCustomerDetails;
    if (!email || !phone || !address || !customername) {
      setCustomerError("Please provide all required details for the new customer.");
      return;
    }

    try {
      const newCustomer = await createCustomer({
        email,
        phone,
        address,
        customername,
      });
      setCustomer(newCustomer); 
      setShowCreateCustomerForm(false); 
      setCustomerError(null);
    } catch (err) {
      setCustomerError("Error creating customer.");
    }
  };




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



  const handleApiError = (err: unknown, defaultMsg: string) => {
    let errorMessage = defaultMsg;
    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || defaultMsg;
    }
    setError(errorMessage);
  };






  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const goToPreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);


  return (
    <div>
     
        <StepCart
          cart={cart}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
         
          promotion={promotion}
          discountedTotal={discountedTotal}
          goToNextStep={goToNextStep}
        />

   
    </div>
  );
};

export default Cart;
