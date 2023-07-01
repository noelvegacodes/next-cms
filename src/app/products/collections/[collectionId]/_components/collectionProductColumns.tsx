"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Cross, MoreHorizontal, X } from "lucide-react";
import Image from "next/image";
export type Product = {
  id: number;
  name: string;
  img: string;

  status: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "img",
    cell: ({ row }) => {
      const img = row.getValue("img");
      return (
        <div className=" w-16 h-16 bg-red-600 rounded-xl overflow-hidden flex ">
          <Image
            className=" object-cover"
            src={img}
            width={128}
            height={128}
            alt={img}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "status",

    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "Active") {
        return <div className=" text-green-500">{status}</div>;
      } else if (status === "Inactive") {
        return <div className=" text-red-500">{status}</div>;
      }
    },
  },

  {
    id: "removeAction",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex justify-end">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <X />
          </Button>
        </div>
      );
    },
  },
];
