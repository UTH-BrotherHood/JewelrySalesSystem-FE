'use client'
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import Cart from "@/containers/home/CartInHome";
import CategoryList from "@/containers/home/CategorySection";
import ProductList from "@/containers/home/ProductListSection";

import TotalSection from "@/containers/home/TotalSection";
import StepCustomer from "@/containers/cart/StepCustomer";
import Invoice from "@/containers/home/Invoice";

import { EmployeeContext } from "@/components/context-provider";
import { useAppSelector } from "@/lib/hooks";
import { fetchCart, fetchPromotion } from "@/api/cartApis";
import { createCustomer, fetchCustomerByName } from "@/api/customerApis";
import { CartResponse, Promotion } from "@/types/cartTypes";
import { Customer } from "@/types/customerTypes";
import SearchInput from "@/containers/home/SearchInput";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Home() {
  // Context and Redux
  const { employee, setEmployee } = useContext(EmployeeContext) || {};
  const router = useRouter();
  const employeeName = useAppSelector((state) => state.employee.username);
  const employeeId = useAppSelector((state: any) => state.employee.employeeId);

  // State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);

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

  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // Format date and time as needed
  };

  // Effects
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

  // Handlers
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

  const handleCouponSubmit = async () => {
    if (couponCode) {
      try {
        const promoData = await fetchPromotion(couponCode);
        setPromotion(promoData);
      } catch (err: unknown) {
        handleApiError(err, "Invalid coupon code");
      }
    }
  };

  const handleCustomerSubmit = async () => {
    if (customerName) {
      try {
        setCustomerLoading(true);
        const response = await fetchCustomerByName(customerName);
        if (response.code === 200) {
          setCustomer(response.result);
          setCustomerError(null);
          setShowCreateCustomerForm(false);
        }
      } catch (err) {
        handleCustomerError(err);
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
      const newCustomer = await createCustomer({ email, phone, address, customername });
      setCustomer(newCustomer);
      setShowCreateCustomerForm(false);
      setCustomerError(null);
    } catch (err) {
      setCustomerError("Error creating customer.");
    }
  };

  const handleCustomerError = (err: unknown) => {
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
  };

  const handleApiError = (err: unknown, defaultMsg: string) => {
    let errorMessage = defaultMsg;
    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || defaultMsg;
    }
    setError(errorMessage);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (setEmployee) {
      setEmployee(null);
    }
    router.push("/sign-in");
  };

  return (
    <main className="flex  flex-col ">
      <div className="flex w-full gap-[24rem] items-center justify-between p-4  bg-blue-50">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="flex gap-4 items-center">
          <div className="font-sm leading-5 text-pnjBlue font-semibold">{employeeName}</div>



          <DropdownMenu>
            <DropdownMenuTrigger> <TiThMenu /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-between items-center">Xem báo cáo ngày </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between items-center">Trang quản lí <MdOutlineDashboard /></DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between items-center" onClick={handleLogout}>Đăng xuất <IoLogInOutline className="w-4 h-4"/></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>

      <div className=" flex gap-5 p-4 ">
        <section className="w-full flex flex-col gap-10">


          <Cart />


          <ProductList
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}

          />
        </section>

        <div>
          <StepCustomer
            customerName={customerName}
            setCustomerName={setCustomerName}
            handleCustomerSubmit={handleCustomerSubmit}
            customerLoading={customerLoading}
            customerError={customerError}
            customer={customer}
            showCreateCustomerForm={showCreateCustomerForm}
            newCustomerDetails={newCustomerDetails}
            setNewCustomerDetails={setNewCustomerDetails}
            handleCreateCustomer={handleCreateCustomer}
          />
          <Invoice
            employeeName={employeeName || ""}
            purchaseTime={getCurrentDateTime()}
            cart={cart}
            customer={customer}
            promotion={promotion}
            employeeId={employeeId}
            customerId={customer?.customerId || ""}
            cartId={cart?.cartId || ""}
            paymentMethodId={selectedPaymentMethod}
          />
        </div>


      </div>
    </main>
  );
}
