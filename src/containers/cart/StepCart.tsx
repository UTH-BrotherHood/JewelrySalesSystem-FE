import { formatPrice } from "@/utils/formatPrice";
import { CartResponse, Promotion } from "@/types/cartTypes";

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
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/2">Product Name</th>
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/6">Quantity</th>
                                        <th className="py-2 px-3 border-b text-sm text-left w-1/6">Price</th>
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
                                            <td className="py-2 px-3 border-b text-sm text-left text-gray-900 w-1/2">
                                                {item.productName || item.productId}
                                            </td>
                                            <td className="py-2 px-3 border-b text-sm text-left text-gray-700 w-1/6">
                                                <div className="flex items-center">
                                                    <button
                                                        className="px-2 py-1 text-white bg-blue-500 rounded"
                                                        onClick={() => handleDecreaseQuantity(item.itemId)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <button
                                                        className="px-2 py-1 text-white bg-blue-500 rounded"
                                                        onClick={() => handleIncreaseQuantity(item.itemId)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3 border-b text-sm text-left text-gray-900 w-1/6">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="py-2 px-3 border-b text-sm text-left w-1/6">
                                                <button
                                                    className="px-2 py-1 text-white bg-red-500 rounded"
                                                    onClick={() => handleRemoveItem(item.itemId)}
                                                >
                                                    Remove
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
