"use client";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { customer } from "./_components/customersColumns";
import { customers } from "./_components/data";
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
        <h2 className="text-xl font-semibold">Customers</h2>
        <CreateCollection />
      </div>
      <DataTable columns={customer} data={customers} />
    </div>
  );
}

function CreateCollection() {
  const { toast } = useToast();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create customer</Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>New Customer</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" placeholder="Customer name..." />
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input id="email" placeholder="Customer email..." />
          </div>
        </div>
        <SheetDescription> Initialize a new customer.</SheetDescription>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={() => {
                const num = Math.random();
                setTimeout(() => {
                  toast({
                    variant: num < 0.5 ? "default" : "destructive",
                    title: "New Customer",
                    description: "You added a new customer.",
                    action: (
                      <ToastAction altText="View customer">
                        <Link href="/customers/1">View</Link>
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
