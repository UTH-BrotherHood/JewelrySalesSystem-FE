import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function ProductsPage() {
  return (
    <div className=" w-full">
      <h1 className="text-2xl">Products</h1>
      <div className="flex justify-end mb-3">
        <Button className="ml-auto bg-buttonBlue">
          <IconPlus />
          Add Products
        </Button>
      </div>
      <Table className="bg-white rounded-md shadow-md">
        <TableCaption>A list of products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Product</TableHead>
            <TableHead className="">Description</TableHead>
            <TableHead className="">CostPrice</TableHead>
            <TableHead className="">Weight</TableHead>
            <TableHead className="">LaborCost</TableHead>
            <TableHead className="">StoneCost</TableHead>
            <TableHead className="">Stock</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="flex items-center gap-2 font-medium">
                <input type="checkbox"></input>
                <div className="w-[44px] h-[44px] overflow-hidden">
                  <Image
                    src={
                      "https://cdn-icons-png.freepik.com/512/7336/7336395.png"
                    }
                    alt="img"
                    width={100}
                    height={100}
                    className="w-full h-full"
                  />
                </div>
                <span>{invoice.invoice}</span>
              </TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="flex text-xs justify-center items-center gap-2">
                <Link href={"#"}>
                  <IconEye className="w-4" />
                </Link>
                <Link href={"#"}>
                  <IconEdit className="w-4" />
                </Link>
                <Link href={"#"}>
                  <IconTrash className="w-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* tesst */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
