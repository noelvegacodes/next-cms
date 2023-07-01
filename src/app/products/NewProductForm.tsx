"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newProduct } from "@/actions/product";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

export default function NewProductForm() {
  const { toast, dismiss } = useToast();
  const [open, setOpen] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const id = await newProduct(values.name);
    toast({
      title: "New Product",
      description: "You added a new product",
      action: (
        <ToastAction altText="View Product" className="p-0">
          <Link
            href={`/products/${id}`}
            className="h-full w-full"
            onClick={() => dismiss()}
          >
            View
          </Link>
        </ToastAction>
      ),
    });
    setOpen(false);
    form.reset();
    console.log(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          + Add product
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-96">
        <SheetHeader>
          <SheetTitle>New Product</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormDescription>Initialize a new product</FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isLoading || form.formState.isSubmitting}
              className="group"
            >
              {/* <div className="h-4 w-4 mr-2 hidden group-disabled:bg-gray-700 group-disabled:block animate-spin border-2 border-t-gray-300  rounded-full"></div> */}
              <Spinner show={form.formState.isSubmitting} />
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
