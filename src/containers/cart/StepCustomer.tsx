import { Input } from "@/components/ui/input";
import { Customer } from "@/types/customerTypes";

interface StepCustomerProps {
    phone: string;
    setPhone: (value: string) => void;
    handleCustomerSubmit: () => void;
    customerLoading: boolean;
    customerError: string | null;
    customer: Customer | null;
    showCreateCustomerForm: boolean;
    newCustomerDetails: { email: string; phone: string; address: string; customername: string };
    setNewCustomerDetails: (details: { email: string; phone: string; address: string; customername: string }) => void;
    handleCreateCustomer: () => void;
}

const StepCustomer = ({
    phone,
    setPhone,
    handleCustomerSubmit,
    customerLoading,
    customerError,
    customer,
    showCreateCustomerForm,
    newCustomerDetails,
    setNewCustomerDetails,
    handleCreateCustomer,
}: StepCustomerProps) => {
    return (
        <div>
            <section className="bg-gray-50 p-5 rounded-lg shadow-sm max-w-3xl mx-auto w-[25rem]">
                <h3 className="text-base font-bold mb-4 text-gray-800 flex items-center gap-4">
                    <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M841.2 841.1H182.9V182.9h292.5v-73.2H109.7v804.6h804.6V621.7h-73.1z" fill="#0F1F3C" /><path d="M402.3 585.1h73.1c0-100.8 82-182.9 182.9-182.9s182.9 82 182.9 182.9h73.1c0-102.2-60.2-190.6-147-231.6 23.2-25.9 37.3-60.1 37.3-97.5 0-80.8-65.5-146.3-146.3-146.3-80.8 0-146.3 65.5-146.3 146.3 0 37.5 14.1 71.7 37.3 97.5-86.8 41.1-147 129.4-147 231.6z m256-402.2c40.3 0 73.1 32.8 73.1 73.1s-32.8 73.1-73.1 73.1-73.1-32.8-73.1-73.1 32.8-73.1 73.1-73.1zM219.4 256h219.4v73.1H219.4zM219.4 658.3h585.1v73.1H219.4zM219.4 402.3h146.3v73.1H219.4z" fill="#0F1F3C" /></svg>
                    Chọn hoặc Tạo thông tin khách hàng</h3>
            
                <Input

                    placeholder="Search products..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  
                    endAdornment={
                        <svg onClick={handleCustomerSubmit} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>}

                />
                {customerLoading && <p className="text-sm text-blue-500 mt-2">Loading...</p>}
                {customerError && <p className="text-sm text-red-500 mt-2">{customerError}</p>}

                {customer && !showCreateCustomerForm && (
                    <div className="mt-4 text-sm">
                        <h4 className="font-medium text-gray-700 mb-3">Thông tin Khách Hàng :</h4>
                        <p><strong>Tên: </strong> {customer.customername}</p>
                        <p><strong>Email: </strong> {customer.email}</p>
                        <p><strong>Số điện thoại: </strong> {customer.phone}</p>
                        <p><strong>Địa chỉ: </strong> {customer.address}</p>
                    </div>
                )}

                {showCreateCustomerForm && (
                    <div className="mt-4 text-sm">
                        <h4 className="font-medium text-gray-700">Create New Customer</h4>
                        <input
                            type="text"
                            value={newCustomerDetails.email}
                            onChange={(e) => setNewCustomerDetails({ ...newCustomerDetails, email: e.target.value })}
                            placeholder="Enter email"
                            className="border border-gray-300 p-2 rounded w-full mb-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            value={newCustomerDetails.phone}
                            onChange={(e) => setNewCustomerDetails({ ...newCustomerDetails, phone: e.target.value })}
                            placeholder="Enter phone"
                            className="border border-gray-300 p-2 rounded w-full mb-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            value={newCustomerDetails.address}
                            onChange={(e) => setNewCustomerDetails({ ...newCustomerDetails, address: e.target.value })}
                            placeholder="Enter address"
                            className="border border-gray-300 p-2 rounded w-full mb-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            value={newCustomerDetails.customername}
                            onChange={(e) => setNewCustomerDetails({ ...newCustomerDetails, customername: e.target.value })}
                            placeholder="Enter customer name"
                            className="border border-gray-300 p-2 rounded w-full mb-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                            onClick={handleCreateCustomer}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Create Customer
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default StepCustomer;
