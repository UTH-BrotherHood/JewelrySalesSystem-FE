'use client'
import React, { useState } from "react";
import {
  IconArrowLeft, IconDiamondFilled, IconPackage, IconStack2,
  IconTicket, IconUsers, IconUsersGroup, IconSettings
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import avt from "@/assets/image/avt.jpg";
import {
  AlertDialog, AlertDialogAction, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import http from "@/utils/http"; // Import your HTTP instance
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

export default function SidebarDashBoard() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconDiamondFilled className="h-5 w-5" /> },
    { label: "Products", href: "/dashboard/products", icon: <IconPackage className="h-5 w-5" /> },
    { label: "Categories", href: "/dashboard/categories", icon: <IconStack2 className="h-5 w-5" /> },
    { label: "Orders", href: "/dashboard/orders", icon: <IconTicket className="h-5 w-5" /> },
    { label: "Employees", href: "/dashboard/employees", icon: <IconUsers className="h-5 w-5" /> },
    { label: "Customers", href: "/dashboard/customers", icon: <IconUsersGroup className="h-5 w-5" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="h-5 w-5" /> }
  ];

  const handleLogout = () => {
    http.clearToken();
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push("/sign-in");
    toast({
      title: "Logout",
      description: "Logout successful",
    });
  };

  return (
    <div className="h-screen fixed top-0 bottom-0 left-0 bg-white z-50 border-l">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <LogoutDialog onLogout={handleLogout} />
            </div>
          </div>
          <SidebarFooter />
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

const Logo = () => (
  <Link href="#" className="flex items-center space-x-2 text-sm text-black">
    <IconDiamondFilled />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white"
    >
      Jewelry Sales System
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link href="#" className="flex items-center space-x-2 text-sm text-black">
    <IconDiamondFilled />
  </Link>
);

const LogoutDialog = ({ onLogout }: { onLogout: () => void }) => (
  <AlertDialog>
    <AlertDialogTrigger className="flex items-center gap-2 text-red-500 py-2">
      <IconArrowLeft className="h-5 w-5" />
      Logout
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        <AlertDialogDescription>
          Your session will be closed and you will be logged out.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onLogout}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const SidebarFooter = () => (
  <SidebarLink
    link={{
      label: "Admin",
      href: "#",
      icon: (
        <Image
          src={avt}
          className="h-7 w-7 rounded-full"
          width={50}
          height={50}
          alt="Admin Avatar"
        />
      )
    }}
  />
);
