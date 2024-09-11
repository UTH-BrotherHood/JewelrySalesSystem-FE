import { useState, useEffect } from "react";
import { CartResponse, Promotion } from "@/types/cartTypes";
import { Customer } from "@/types/customerTypes";
import { formatPrice } from "@/utils/formatPrice";
import { fetchPromotion, fetchPaymentMethods } from "@/api/cartApis";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { createSalesOrder } from "@/api/saleOrderApi";
import { useAppSelector } from "@/lib/hooks";

const Invoice = ({
    cart,
    customer,
    promotion,
    employeeId,
    employeeName,
    customerId,
    cartId,
    paymentMethodId,
    purchaseTime,
}: {
    cart: CartResponse | null;
    customer: Customer | null;
    promotion: Promotion | null;
    employeeId: string;
    employeeName: string;
    customerId: string;
    cartId: string;
    paymentMethodId: string;
    purchaseTime: string;
}) => {
    if (!cart || !customer) return null;

    const storeInfo = {
        name: "Tên Cửa Hàng",
        address: "Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM",
        phone: "SĐT: 0123 456 789",
        returnPolicy: "Chính sách đổi trả: Đổi trả trong vòng 7 ngày với sản phẩm còn nguyên tem và hóa đơn.",
    };

    const { toast } = useToast();

    const [otherCharges, setOtherCharges] = useState<number>(0);
    const [customerPayment, setCustomerPayment] = useState<number>(0);
    const [couponCode, setCouponCode] = useState<string>("");
    const [appliedPromotion, setAppliedPromotion] = useState<Promotion | null>(promotion);
    const [error, setError] = useState<string | null>(null);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(paymentMethodId);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadPaymentMethods = async () => {
            try {
                const response = await fetchPaymentMethods();
                setPaymentMethods(response);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch payment methods.",
                });
            }
        };

        loadPaymentMethods();
    }, [toast]);

    const createSaleOrder = async () => {
        setIsLoading(true); // Start loading

        // Check for missing fields and display specific error messages
        if (!customer?.customerId) {
            toast({
                title: "Error",
                description: "Customer ID is missing. Please select a customer.",
            });
            setIsLoading(false); // Stop loading
            return;
        }

        if (!employeeId) {
            toast({
                title: "Error",
                description: "Employee ID is missing. Please ensure an employee is logged in.",
            });
            setIsLoading(false); // Stop loading
            return;
        }

        if (!cart?.cartId) {
            toast({
                title: "Error",
                description: "Cart ID is missing. Please add items to the cart.",
            });
            setIsLoading(false); // Stop loading
            return;
        }

        if (!selectedPaymentMethod) {
            toast({
                title: "Error",
                description: "Payment method is missing. Please select a payment method.",
            });
            setIsLoading(false); // Stop loading
            return;
        }

        try {
            // Call createSalesOrder with required parameters
            const response = await createSalesOrder(
                customer.customerId,
                employeeId,
                cart.cartId,
                appliedPromotion ? appliedPromotion.promotionCode : '', // Use empty string if no promotion
                selectedPaymentMethod
            );

            toast({
                title: "Success",
                description: "Order created successfully.",
            });

            // Optionally, handle the response (e.g., redirect, clear cart)
            console.log("Sales order created successfully:", response);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create the order. Please try again.",
            });
            console.error("Error creating sales order:", error);
        }

        setIsLoading(false); // Stop loading
    };

    const totalAmount = cart.totalAmount;
    const discount = appliedPromotion ? totalAmount * (appliedPromotion.discountPercentage / 100) : 0;
    const discountedTotal = totalAmount - discount;
    const amountDue = discountedTotal + otherCharges;
    const changeDue = customerPayment - amountDue;

    const handleCouponSubmit = async () => {
        if (!couponCode) {
            toast({
                title: "Error",
                description: "Please enter a coupon code.",
            });
            return;
        }

        try {
            const promoData = await fetchPromotion(couponCode);
            const currentDate = new Date();
            const startDate = new Date(promoData.startDate);
            const endDate = new Date(promoData.endDate);

            if (currentDate >= startDate && currentDate <= endDate) {
                setAppliedPromotion(promoData);
                toast({
                    title: "Success",
                    description: "Coupon applied successfully!",
                });
            } else {
                toast({
                    title: "Error",
                    description: `This promotion is not valid. Valid from ${promoData.startDate} to ${promoData.endDate}.`,
                });
                setAppliedPromotion(null);
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "Invalid coupon code or promotion not found.",
            });
            setAppliedPromotion(null);
        }
    };

    const generatePdf = () => {
        const invoiceElement = document.getElementById("invoice");

        if (invoiceElement) {
            const options = {
                margin: 1,
                filename: `invoice-${customer.customername}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().from(invoiceElement).set(options).save().then(() => {
                toast({
                    title: "Success",
                    description: "PDF generated and downloaded successfully!",
                });
            }).catch(() => {
                toast({
                    title: "Error",
                    description: "Failed to generate PDF. Please try again.",
                });
            });
        } else {
            toast({
                title: "Error",
                description: "Invoice element not found.",
            });
        }
    };

    return (
        <div>
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50 z-10">
                    <div className="relative flex justify-center items-center">
                        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                        <img
                            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
                            className="rounded-full h-28 w-28"
                            alt="Loading"
                        />
                    </div>
                </div>
            )}
            <div id="invoice" className={`bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-6 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                        <div id="invoice" className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-6 o">
                            {/* Store Info */}
                            <div className="mb-6 text-center">
                                <h1 className="text-base font-bold text-indigo-700">{storeInfo.name}</h1>
                                <p className="text-sm">{storeInfo.address}</p>
                                <p className="text-sm">{storeInfo.phone}</p>
                            </div>

                            <h2 className="text-base font-bold mb-4 text-gray-800">Hóa đơn</h2>

                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-700">Thông tin khách hàng</h3>
                                <p className="text-sm">Tên: {customer.customername}</p>
                                <p className="text-sm">Email: {customer.email}</p>
                                <p className="text-sm">Số điện thoại: {customer.phone}</p>
                                <p className="text-sm">Địa chỉ: {customer.address}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-700">Sản phẩm trong giỏ hàng</h3>
                                {cart.items.map((item) => (
                                    <div key={item.itemId} className="flex justify-between py-2 border-b">
                                        <span className="text-sm">{item.productName || item.productId}</span>
                                        <span className="text-sm">{item.quantity} x {formatPrice(item.price)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-700">Phương thức thanh toán</h3>
                                <select
                                    value={selectedPaymentMethod}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className="w-full p-2 border"
                                >
                                    {paymentMethods?.map((method) => (
                                        <option key={method.paymentMethodId} value={method.paymentMethodId}>
                                            {method.paymentMethodName} - {method.details}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-700">Thời gian mua hàng</h3>
                                <p className="text-sm">{purchaseTime}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-gray-700">Nhân viên phụ trách</h3>
                                <p className="text-sm">{employeeName}</p>
                            </div>

                            <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-800">Tổng tiền hàng:</span>
                                    <span className="text-sm text-gray-900">{formatPrice(totalAmount)}</span>
                                </div>

                                {appliedPromotion && (
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-semibold text-gray-800">Giảm giá ({appliedPromotion.discountPercentage}%):</span>
                                        <span className="text-sm text-gray-900">{formatPrice(discount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-800">Thu khác:</span>
                                    <input
                                        type="number"
                                        value={otherCharges}
                                        onChange={(e) => setOtherCharges(Number(e.target.value))}
                                        className="w-20 text-right"
                                    />
                                </div>

                                <div className="flex justify-between mb-2">
                                    <span className="text-base font-semibold text-gray-800">Khách cần trả:</span>
                                    <span className="text-base text-gray-900">{formatPrice(amountDue)}</span>
                                </div>

                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-800">Khách trả:</span>
                                    <input
                                        type="number"
                                        value={customerPayment}
                                        onChange={(e) => setCustomerPayment(Number(e.target.value))}
                                        className="w-20 text-right"
                                    />
                                </div>

                                {customerPayment > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-sm font-semibold text-gray-800">Tiền thối lại:</span>
                                        <span className="text-sm text-gray-900">{formatPrice(changeDue)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* The rest of your invoice content */}
                    <div className="mt-4 flex justify-end space-x-4">
                        <Button onClick={createSaleOrder} className="bg-indigo-600 text-white">
                            Tạo đơn hàng
                        </Button>
                        <Button onClick={generatePdf} className="bg-indigo-600 text-white">
                            Tải hóa đơn PDF
                        </Button>
                    </div>
                </div>
        
        </div>
    );
};

export default Invoice;
