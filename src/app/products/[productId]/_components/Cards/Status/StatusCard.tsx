"use client";
import { revalidate, updateProductStatus } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function StatusCard({
  productId,
  status,
}: {
  productId: string;
  status: string;
}) {
  const form = useForm<{ status: string }>({
    defaultValues: { status },
  });

  useEffect(() => {
    form.reset({ status });
  }, [status]);

  const onSubmit = async (data: { status: any }) => {
    await updateProductStatus({ id: productId, status: data.status });
    revalidate("/products/" + productId);
  };
  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent id="card content">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
            <Button type="submit" disabled={!form.formState.isDirty}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
