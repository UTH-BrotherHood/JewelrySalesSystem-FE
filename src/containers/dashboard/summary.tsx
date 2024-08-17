import {
  IconCertificate,
  IconCurrencyDollar,
  IconFileInvoice,
  IconReceiptRefund,
} from "@tabler/icons-react";
import React from "react";

export default function Summary() {
  return (
    <div className="flex gap-8 mt-8">
      {/* card */}
      <div className="bg-card w-[25%] rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Revenue</p>
          <IconCurrencyDollar size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold">$ 45,231.89</span>
        </div>
      </div>

      <div className="bg-card w-[25%] rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Orders</p>
          <IconFileInvoice size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold"> 45</span>
        </div>
      </div>

      <div className="bg-card w-[25%] rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Refund Orders</p>
          <IconReceiptRefund size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold"> 5</span>
        </div>
      </div>

      <div className="bg-card w-[25%] rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Warranty Orders</p>
          <IconCertificate size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold"> 3</span>
        </div>
      </div>
    </div>
  );
}
