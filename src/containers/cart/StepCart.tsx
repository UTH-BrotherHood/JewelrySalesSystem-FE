import { formatPrice } from "@/utils/formatPrice";
import { CartResponse, Promotion } from "@/types/cartTypes";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

interface StepCartProps {
    cart: CartResponse | null;
    couponCode: string;
    setCouponCode: (value: string) => void;
    handleCouponSubmit: () => void;
    promotion: Promotion | null;
    discountedTotal: number;
    goToNextStep: () => void;
    handleIncreaseQuantity: (itemId: string) => void;
    handleDecreaseQuantity: (itemId: string) => void;
    handleRemoveItem: (itemId: string) => void;

}

const StepCart = ({
    cart,
    couponCode,
    setCouponCode,
    handleCouponSubmit,
    promotion,
    discountedTotal,
    goToNextStep,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,

}: StepCartProps) => {
    return (
        <div className="w-full flex justify-center">
            <section className="bg-white rounded-lg w-full h-2/3">
                {cart && (
                    <div className="w-full h-full">
                        {cart.items.length ? (
                            <table className="w-full bg-gray-100 rounded-lg">
                                <thead className="bg-gray-200 text-gray-600">
                                    <tr>
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/6">Image</th>
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/3">Product Name</th>
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/6">Quantity</th>
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/6">Price</th>
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/6">Total Price</th> {/* New Total Price Column */}
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item, index) => (
                                        <tr
                                            key={item.itemId}
                                            className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                        >
                                            <td className="py-2 px-3 border-b text-sm text-left w-1/6">
                                                <img
                                                    src={item.productImageUrl}
                                                    alt={item.productName}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="py-2 px-3 border-b text-sm text-left text-gray-900 w-1/3 overflow-hidden whitespace-nowrap text-ellipsis">
                                                {item.productName || item.productId}
                                            </td>

                                            <td className="py-2 px-3 border-b text-sm text-left text-gray-700 w-1/6">
                                                <div className="flex items-center">
                                                    <button
                                                       
                                                        onClick={() => handleDecreaseQuantity(item.itemId)}
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <div className="py-2 px-3  text-sm text-left text-gray-900">{item.quantity}</div>
                                                    <button
                                                        
                                                        onClick={() => handleIncreaseQuantity(item.itemId)}
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3 border-b text-sm text-left text-gray-900 w-1/6">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="py-2 px-3 border-b text-sm text-left text-gray-900 w-1/6">
                                                {formatPrice(item.price * item.quantity)} 
                                            </td>
                                            <td className="py-2 px-3 border-b text-sm  ">
                                                <button
                                                  className="flex justify-center items-center"
                                                    onClick={() => handleRemoveItem(item.itemId)}
                                                >
                                                    <MdOutlineRemoveShoppingCart />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No items in cart</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default StepCart;
