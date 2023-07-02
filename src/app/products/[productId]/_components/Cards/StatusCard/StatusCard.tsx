"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductContext } from "@/providers/Product";
import { useContext } from "react";

export default function StatusCard() {
  const { form } = useContext(ProductContext);

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent id="card content">
        <FormField
          control={form.control}
          name="product.status"
          render={({ field }) => (
            <FormItem className="mb-4">
              <Select
                // @ts-ignore
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
