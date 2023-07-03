"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const PricingCard = () => {
  const form = useFormContext();

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
                <Input type="number" min={0} {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product.priceCompareTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compare-at price</FormLabel>
                <Input type="number" min={0} {...field} />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex  gap-4 items-center">
        <FormField
          control={form.control}
          name="product.cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit price</FormLabel>
              <Input {...field} type="number" />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Profit</FormLabel>
          <Input
            disabled
            className="bg-slate-200"
            value={(
              Number(form.watch("product.cost")) -
              Number(form.watch("product.price"))
            ).toFixed(2)}
          />
        </div>
        <div>
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
