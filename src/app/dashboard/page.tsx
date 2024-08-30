import { RevenueChart } from "@/containers/dashboard/revenue-chart";
import Summary from "@/containers/dashboard/summary";
import { ProductsByCategory } from "@/containers/dashboard/top-products-by-category";
import { ProductsByRevenue } from "@/containers/dashboard/top-products-by-revenue";
import { TopSalesEmployees } from "@/containers/dashboard/top-sales-employees";
import { TopSellChart } from "@/containers/dashboard/top-selling-products-chart";

import React from "react";

export default function Dashboard() {
  return (
    <main className="text-black dark:text-white">
      <h1 className="text-3xl font-bold">DashBoard</h1>
      <Summary />
      <div className="flex flex-col justify-center gap-8 w-full mt-8">
        <div className="flex justify-center  w-full h-[40%] gap-8">
          <RevenueChart />
          <ProductsByRevenue />
        </div>
        <div className="flex justify-between gap-8 ">
          <TopSellChart />
          <TopSalesEmployees />
          <ProductsByCategory />
        </div>
      </div>
    </main>
  );
}
