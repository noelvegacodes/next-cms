"use client";
import { revalidate, updateProductPrice } from "@/actions/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductContext } from "@/providers/Product";
import { Decimal } from "@prisma/client/runtime";
import { useContext } from "react";

type FormType = {
  price: Decimal;
  priceCompareTo: Decimal;
  cost: Decimal;
};

const PricingCard = () => {
  const {
    form,
    product: { id },
  } = useContext(ProductContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="border-b">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="product.price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  min={0}
                  {...field}
                  value={Number(field.value)}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product.priceCompareTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compare-at price</FormLabel>
                <Input
                  type="number"
                  min={0}
                  {...field}
                  value={Number(field.value)}
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
            name="product.cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit price</FormLabel>
                <Input {...field} type="number" value={Number(field.value)} />
              </FormItem>
            )}
          />
          <FormLabel>Profit</FormLabel>
          <Input
            disabled
            className="bg-slate-200"
            value={(
              Number(form.watch("product.cost")) -
              Number(form.watch("product.price"))
            ).toFixed(2)}
          />
          <FormLabel>Margin</FormLabel>
          <Input
            disabled
            className="bg-slate-200"
            value={
              Number(form.watch("product.cost")) -
                Number(form.watch("product.price")) ===
              0
                ? 0
                : (
                    (Number(
                      (
                        Number(form.watch("product.cost")) -
                        Number(form.watch("product.price"))
                      ).toFixed(2)
                    ) /
                      Number(form.watch("product.cost"))) *
                    100
                  ).toFixed(2) + " %"
            }
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
