"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { categoryNames } from "./data/data";
import { Product } from "./data/productsSchema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

// Thêm component Modal
const ImageModal = ({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        objectFit="contain"
        className="max-w-full max-h-[80vh]"
      />
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
      >
        X
      </button>
    </div>
  </div>
);

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl: string = row.getValue("imageUrl");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isModalOpen, setIsModalOpen] = useState(false);

      return (
        <>
          <div
            className="w-10 h-10 relative cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={imageUrl}
              alt={row.getValue("name")}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          {isModalOpen && (
            <ImageModal
              src={imageUrl}
              alt={row.getValue("name")}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const categoryName = categoryNames.find(
        (categoryName) => categoryName.value === row.original.categoryName
      );

      return (
        <div className="flex space-x-2">
          {categoryName && (
            <Badge variant="outline">{categoryName.label}</Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "costPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost Price" />
    ),
    cell: ({ row }) => {
      const categoryName = categoryNames.find(
        (categoryName) => categoryName.value === row.original.name
      );

      return (
        <div className="flex space-x-2">
          {categoryName && (
            <Badge variant="outline">{categoryName.label}</Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("costPrice")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const categoryName = categoryNames.find(
        (categoryName) => categoryName.value === row.original.categoryName
      );

      return (
        <div className="flex space-x-2">
          {categoryName && (
            <Badge variant="outline">{categoryName.label}</Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("weight")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "laborCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Labor Cost" />
    ),
    cell: ({ row }) => {
      const categoryName = categoryNames.find(
        (categoryName) => categoryName.value === row.original.categoryName
      );

      return (
        <div className="flex space-x-2">
          {categoryName && (
            <Badge variant="outline">{categoryName.label}</Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("laborCost")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "stoneCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stone Cost" />
    ),
    cell: ({ row }) => {
      const categoryName = categoryNames.find(
        (categoryName) => categoryName.value === row.original.categoryName
      );

      return (
        <div className="flex space-x-2">
          {categoryName && (
            <Badge variant="outline">{categoryName.label}</Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("stoneCost")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
