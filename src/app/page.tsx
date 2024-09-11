"use client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import StepCustomer from "@/containers/cart/StepCustomer";
import Invoice from "@/containers/home/Invoice";
import ProductList from "@/containers/home/ProductListSection";

import {
  addToCart,
  decreaseItemQuantity,
  fetchCart,
  fetchPromotion,
  increaseItemQuantity,
  removeFromCart,
} from "@/api/cartApis";
import { createCustomer, fetchCustomerByPhone } from "@/api/customerApis";
import { EmployeeContext } from "@/components/context-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import StepCart from "@/containers/cart/StepCart";
import SearchInput from "@/containers/home/SearchInput";
import { useAppSelector } from "@/lib/hooks";
import { CartResponse, Promotion } from "@/types/cartTypes";
import { Customer } from "@/types/customerTypes";
import { IProduct } from "@/types/productTypes";
import { IoLogInOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";

export default function Home() {
  const { toast } = useToast();
  const { employee, setEmployee } = useContext(EmployeeContext) || {};
  const router = useRouter();
  const employeeName = useAppSelector((state) => state.employee.username);
  const employeeId = useAppSelector((state: any) => state.employee.employeeId);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);
  const [customerLoading, setCustomerLoading] = useState<boolean>(false);
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerError, setCustomerError] = useState<string | null>(null);
  const [showCreateCustomerForm, setShowCreateCustomerForm] =
    useState<boolean>(false);
  const [newCustomerDetails, setNewCustomerDetails] = useState({
    email: "",
    phone: "",
    address: "",
    customername: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
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
    if (customerPhone) {
      try {
        setCustomerLoading(true);
        const response = await fetchCustomerByPhone(customerPhone);
        if (response.code === 200) {
          setCustomer(response.result);
          setCustomerError(null);
          setShowCreateCustomerForm(false);
          toast({
            title: "Success",
            description: "Customer found.",
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Customer not found. Please create a new customer.",
        });
      } finally {
        setCustomerLoading(false);
      }
    }
  };

  const handleCreateCustomer = async () => {
    const { email, phone, address, customername } = newCustomerDetails;
    if (!email || !phone || !address || !customername) {
      setCustomerError(
        "Please provide all required details for the new customer."
      );
      toast({
        title: "Error",
        description: "Please fill all required fields.",
      });
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
      toast({
        title: "Success",
        description: "Customer created successfully.",
      });
    } catch (err) {
      setCustomerError("Error creating customer.");
      toast({
        title: "Error",
        description: "Failed to create customer.",
      });
    }
  };

  // const handleCustomerError = (err: unknown) => {
  //   if (axios.isAxiosError(err)) {
  //     if (err.response?.status === 404) {
  //       setCustomerError("Customer not found. Please create a new customer.");
  //       setShowCreateCustomerForm(true);
  //     } else {
  //       setCustomerError("An error occurred while fetching the customer.");
  //     }
  //   } else {
  //     setCustomerError("An unexpected error occurred.");
  //   }
  // };

  const handleApiError = (err: unknown, defaultMsg: string) => {
    let errorMessage = defaultMsg;
    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || defaultMsg;
    }
    setError(errorMessage);
  };

  const handleAddToCart = async (product: IProduct) => {
    try {
      await addToCart(employeeId, product.productId as any, 1);
      toast({
        title: "Success",
        description: "Product added to cart successfully!",
      });
      await fetchCartData(employeeId);
    } catch (error) {
      toast({
        title: "Error",
        description: `Error adding product to cart:${
          (error as Error).message || "Unknown error"
        }`,
      });
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

      toast({
        title: "Success",
        description: "Item removed from cart.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Error removing item: ${
          (error as Error).message || "Unknown error"
        }`,
      });
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (setEmployee) {
      setEmployee(null);
    }
    router.push("/sign-in");
  };

  return (
    <main className="flex flex-col">
      <div className="flex w-full gap-[24rem] items-center justify-between p-4">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex gap-4 items-center">
          <div className="font-sm leading-5 text-pnjBlue font-semibold">
            {employeeName}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <TiThMenu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Xem báo cáo ngày</DropdownMenuItem>
              <DropdownMenuItem>
                Trang quản lí <MdOutlineDashboard />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Đăng xuất <IoLogInOutline />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex gap-5 p-4">
        <section className="w-full flex flex-col gap-10">
          <StepCart
            cart={cart}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            handleCouponSubmit={() => {}}
            promotion={promotion}
            discountedTotal={discountedTotal}
            goToNextStep={() => {}}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleRemoveItem={handleRemoveItem}
          />
          <ProductList
            selectedCategory={selectedCategory || null}
            searchTerm={searchTerm}
            onAddToCart={handleAddToCart}
          />
        </section>
        <div>
          <StepCustomer
            phone={customerPhone}
            setPhone={setCustomerPhone}
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
