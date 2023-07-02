"use client";
import * as React from "react";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/providers/Product";
import { updateNameAndDescription } from "@/actions/product";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500),
});

export default function NameDescriptionCard() {
  const {
    product: { id },
    form,
  } = useContext(ProductContext);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, description } = values;
    await updateNameAndDescription(id, name, description);
  }

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>Name & Description</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="product.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={6} className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
