"use client";
import { revalidate, updateProductPrice } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

type FormType = {
  price: number;
  priceCompareTo: number;
  cost: number;
};

interface PricingCardProps {
  productId: string;
  defaultValues: FormType;
}

const PricingCard: FC<PricingCardProps> = ({ productId, defaultValues }) => {
  const form = useForm<FormType>({ defaultValues });

  const onSubmit = async (data: FormType) => {
    console.log("Form submitted\n", data);
    await updateProductPrice({ productId, ...data });
    revalidate("/products/" + productId);
  };
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <CardContent className="border-b">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <Input type="number" min={0} {...form.register("price")} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceCompareTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compare-at price</FormLabel>
                    <Input
                      type="number"
                      min={0}
                      {...form.register("priceCompareTo")}
                    />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-4 flex flex-col items-start gap-4">
            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit price</FormLabel>
                    <Input {...form.register("cost")} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceCompareTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit</FormLabel>
                    <Input
                      disabled
                      className="bg-slate-200"
                      value={(form.watch("cost") - form.watch("price")).toFixed(
                        2
                      )}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceCompareTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Margin</FormLabel>
                    <Input
                      disabled
                      className="bg-slate-200"
                      value={
                        Number(
                          (form.watch("cost") - form.watch("price")).toFixed(2)
                        ) === 0
                          ? 0
                          : (
                              (Number(
                                (
                                  form.watch("cost") - form.watch("price")
                                ).toFixed(2)
                              ) /
                                form.watch("cost")) *
                              100
                            ).toFixed(2) + " %"
                      }
                    />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={!form.formState.isDirty}
              className="block"
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PricingCard;
