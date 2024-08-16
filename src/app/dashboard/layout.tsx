import SidebarDashBoard from "@/app/dashboard/sidebardashboard";
import { cn } from "@/lib/utils";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen bg-[#F4F7FE]"
      )}
    >
      <SidebarDashBoard></SidebarDashBoard>
      <div className="w-full h-full px-10 py-14 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
