"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function Loading() {
  return <LoadingTable headers={["Name", "Products", "Status", "Actions"]} />;
}

function LoadingTable({ headers }: { headers: string[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center py-4">
          <Input placeholder="Filter collections..." className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"></DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>
                  <Skeleton className="w-2 h-2" />
                </TableHead>
                {headers.map((header) => {
                  return <TableHead key={header}>{header}</TableHead>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((row) => {
                return (
                  <TableRow key={row}>
                    <TableCell className="w-fit">
                      <Skeleton className="w-8 h-8" />
                    </TableCell>

                    <TableCell className="">
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-8 h-8" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
