import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "@/containers/dashboard/columns";
import { DataTable } from "@/containers/dashboard/data-table";
import { productSchema } from "@/containers/dashboard/data/productsSchema";

export const metadata: Metadata = {
  title: "Products | Dashboard",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/containers/dashboard/data/products.json")
  );

  const products = JSON.parse(data.toString());

  return z.array(productSchema).parse(products);
}

export default async function ProductsPage() {
  const products = await getTasks();

  return (
    <>
      <div className="p-4 bg-white rounded-lg">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your products
            </p>
          </div>
        </div>
        <DataTable data={products} columns={columns} />
      </div>
    </>
  );
}
