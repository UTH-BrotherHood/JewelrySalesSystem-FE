import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CartResponse, Promotion } from "@/types/cartTypes";
import { Customer } from "@/types/customerTypes";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import { fetchPromotion } from "@/api/cartApis";

const Invoice = ({
    cart,
    customer,
    promotion,
    employeeId,
    employeeName, // Add employee name
    customerId,
    cartId,
    paymentMethodId,
    purchaseTime,  // Add purchase time
}: {
    cart: CartResponse | null;
    customer: Customer | null;
    promotion: Promotion | null;
    employeeId: string;
    employeeName: string;  // Add employeeName type
    customerId: string;
    cartId: string;
    paymentMethodId: string;
    purchaseTime: string;  // Add purchase time type
}) => {
    if (!cart || !customer) return null;

    const storeInfo = {
        name: "Tên Cửa Hàng",
        address: "Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM",
        phone: "SĐT: 0123 456 789",
        returnPolicy: "Chính sách đổi trả: Đổi trả trong vòng 7 ngày với sản phẩm còn nguyên tem và hóa đơn.",
    };

    const [otherCharges, setOtherCharges] = useState<number>(0);
    const [customerPayment, setCustomerPayment] = useState<number>(0);
    const [couponCode, setCouponCode] = useState<string>("");
    const [appliedPromotion, setAppliedPromotion] = useState<Promotion | null>(promotion);
    const [error, setError] = useState<string | null>(null);

    // Calculate totals
    const totalAmount = cart.totalAmount;
    const discount = appliedPromotion ? totalAmount * (appliedPromotion.discountPercentage / 100) : 0;
    const discountedTotal = totalAmount - discount;
    const amountDue = discountedTotal + otherCharges;
    const changeDue = customerPayment - amountDue;

    // Handle coupon code submission
    const handleCouponSubmit = async () => {
        if (!couponCode) {
            setError("Please enter a coupon code.");
            return;
        }

        try {
            const promoData = await fetchPromotion(couponCode);
            const currentDate = new Date();
            const startDate = new Date(promoData.startDate);
            const endDate = new Date(promoData.endDate);

            if (currentDate >= startDate && currentDate <= endDate) {
                setAppliedPromotion(promoData);
                setError(null);
            } else {
                setError(`This promotion is not valid. Valid from ${promoData.startDate} to ${promoData.endDate}`);
                setAppliedPromotion(null);
            }
        } catch (err) {
            setError("Invalid coupon code or promotion not found.");
            setAppliedPromotion(null);
        }
    };

    const generatePdf = async () => {
        const invoiceElement = document.getElementById("invoice");

        if (invoiceElement) {
            const canvas = await html2canvas(invoiceElement);
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`invoice-${customer.customername}.pdf`);
        }
    };

    return (
        <div>
            <div id="invoice" className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-6  max-h-[600px] overflow-y-auto">
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
                        <span className="text-sm font-semibold text-gray-800">Khách thanh toán:</span>
                        <input
                            type="number"
                            value={customerPayment}
                            onChange={(e) => setCustomerPayment(Number(e.target.value))}
                            className="w-20 text-right"
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                        <span className="text-base font-semibold text-gray-800">Tiền thừa trả khách:</span>
                        <span className="text-base text-gray-900">{formatPrice(changeDue >= 0 ? changeDue : 0)}</span>
                    </div>
                </div>

                {/* Coupon Code Section */}
                <div className="mt-4">
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="border p-2 mb-2 w-full text-sm"
                    />
                    <button
                        onClick={handleCouponSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                    >
                        Apply Coupon
                    </button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                {/* Return Policy */}
                <div className="mt-6 border-t pt-4">
                    <p className="text-xs text-gray-600">{storeInfo.returnPolicy}</p>
                </div>
            </div>

            <button
                onClick={generatePdf}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
            >
                Tải hóa đơn PDF
            </button>

            {/* Hidden fields for employee_id, customer_id, cart_id, payment_method_id */}
            <input type="hidden" value={employeeId} />
            <input type="hidden" value={customerId} />
            <input type="hidden" value={cartId} />
            <input type="hidden" value={paymentMethodId} />
        </div>


    );
};

export default Invoice;
