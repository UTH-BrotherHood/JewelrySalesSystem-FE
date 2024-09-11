import SidebarDashBoard from "@/app/dashboard/sidebardashboard";
import { cn } from "@/lib/utils";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen rounded-md flex bg-[#F4F7FE] dark:bg-neutral-800 w-full h-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <SidebarDashBoard></SidebarDashBoard>
        <div className="ml-20 w-full px-10 py-14 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
