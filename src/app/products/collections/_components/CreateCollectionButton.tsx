"use client";

import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function CreateCollectionButton() {
  const { toast } = useToast();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create collection</Button>
      </SheetTrigger>
      <SheetContent className=" w-96">
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
                        {/* <Link href="/products/collections/1">View</Link> */}
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
