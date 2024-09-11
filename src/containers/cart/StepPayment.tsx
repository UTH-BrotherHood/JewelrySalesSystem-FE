import { useState } from "react";

interface StepPaymentProps {
    goToPreviousStep: () => void;
    selectPaymentMethod: (method: string) => void;
}

const StepPayment = ({ goToPreviousStep, selectPaymentMethod }: StepPaymentProps) => {
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const handlePaymentSelection = (method: string) => {
        setPaymentMethod(method);
        selectPaymentMethod(method);
    };

    return (
        <div>
            <section className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Payment Method</h3>
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => handlePaymentSelection("Credit Card")}
                        className={`p-3 rounded-lg ${paymentMethod === "Credit Card" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                    >
                        Credit Card
                    </button>
                    <button
                        onClick={() => handlePaymentSelection("Paypal")}
                        className={`p-3 rounded-lg ${paymentMethod === "Paypal" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                    >
                        Paypal
                    </button>
                    <button
                        onClick={() => handlePaymentSelection("Bank Transfer")}
                        className={`p-3 rounded-lg ${paymentMethod === "Bank Transfer" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                    >
                        Bank Transfer
                    </button>
                </div>
            </section>
            <button onClick={goToPreviousStep} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg">
                Previous
            </button>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">Confirm Payment</button>
        </div>
    );
};

export default StepPayment;
