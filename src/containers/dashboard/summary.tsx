'use client'
import {
  IconCertificate,
  IconCurrencyDollar,
  IconFileInvoice,
  IconReceiptRefund,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import http from "@/utils/http";
import Cookies from "js-cookie";

export default function Summary() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalProductsSold: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          http.setToken(token);
        }
        const response = await http.get('/statistics/dashboard-stats');
   
        if (response.data.code === 200) {
          setStats(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
        throw error;
      }
    };
    

    fetchStats();
  }, []);

  return (
    <div className="flex gap-8 mt-8">
      {/* Total Revenue */}
      <div className="bg-card flex-1 rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Revenue</p>
          <IconCurrencyDollar size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold">${stats.totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-card flex-1 rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Orders</p>
          <IconFileInvoice size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold">{stats.totalOrders}</span>
        </div>
      </div>

      {/* Total Refund Orders */}
      <div className="bg-card flex-1 rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Products Sold</p>
          <IconReceiptRefund size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold">{stats.totalProductsSold}</span> 
        </div>
      </div>

      {/* Total Warranty Orders */}
      <div className="bg-card flex-1 rounded-lg py-8 px-5 border-gray-200 border-[1px] shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total Customers</p>
          <IconCertificate size={20} />
        </div>
        <div>
          <span className="text-2xl font-extrabold">{stats.totalCustomers}</span> 
        </div>
      </div>
    </div>
  );
}
