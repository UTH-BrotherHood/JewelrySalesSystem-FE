"use client";

import { ColumnDef } from "@tanstack/react-table";

import { categoryNames } from "./data/data";
import { Product } from "./data/productsSchema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
        // eslint-disable-next-line jsx-a11y/aria-props
        // aria-categoryName="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        // eslint-disable-next-line jsx-a11y/aria-props
        // aria-categoryName="Select row"
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
