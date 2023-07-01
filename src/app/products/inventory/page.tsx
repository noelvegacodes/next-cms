"use client";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { inventory } from "./_components/inventoryColumns";
import { inventories } from "./_components/data";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-10 pb-4 border-b">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <CreateCollection />
      </div>
      <DataTable columns={inventory} data={inventories} />
    </div>
  );
}

function CreateCollection() {
  const { toast } = useToast();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create collection</Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>New Collection</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" placeholder="Collection name..." />
          </div>
        </div>
        <SheetDescription> Initialize a new collection.</SheetDescription>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={() => {
                const num = Math.random();
                setTimeout(() => {
                  toast({
                    variant: num < 0.5 ? "default" : "destructive",
                    title: "New Collection",
                    description: "You added a new collection.",
                    action: (
                      <ToastAction altText="View collection">
                        <Link href="/products/collections/1">View</Link>
                      </ToastAction>
                    ),
                  });
                }, 2000);
              }}
            >
              Submit
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
