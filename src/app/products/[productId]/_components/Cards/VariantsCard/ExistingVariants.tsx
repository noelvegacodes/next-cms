"use client";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { GripVertical, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductContext } from "@/providers/Product";

export default function ExistingVariants() {
  const { form } = useContext(ProductContext);

  const { fields: variants, remove } = useFieldArray({
    name: `product.variants`,
    control: form.control,
  });

  return (
    <>
      {variants.map((variant, index) => {
        return (
          <ExistingVariant
            key={variant.id}
            variant={variant}
            onDelete={() => remove(index)}
            variantIndex={index}
          />
        );
      })}
    </>
  );
}

function ExistingVariant({
  variant,
  variantIndex,
  onDelete,
}: {
  variant: { id: string; name: string; values: { value: string }[] };
  variantIndex: number;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { form } = useContext(ProductContext);
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    name: `product.variants.${variantIndex}.values`,
    control: form.control,
  });

  if (!open) {
    return (
      <article className="border-b p-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <GripVertical size={20} />
          <div>
            <h6 className="capitalize mb-1 font-medium text-sm">
              {variant.name}
            </h6>
            <ul className="flex gap-1">
              {variant.values.map(({ value }) => {
                return (
                  <Badge variant="secondary" key={value}>
                    {value}
                  </Badge>
                );
              })}
            </ul>
          </div>
        </div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </article>
    );
  } else {
    return (
      <>
        <FormField
          control={form.control}
          name={`product.variants.${variantIndex}.name`}
          render={({ field }) => (
            <FormItem className=" p-6 ">
              <FormLabel>Type</FormLabel>
              <div className="flex gap-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="color">Color</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                    <SelectItem value="style">Style</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" variant={"outline"} onClick={onDelete}>
                  <Trash2 size={18} />
                </Button>
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-1 px-6">
          {options.map((option, optionIndex) => {
            return (
              <FormField
                key={option.id}
                control={form.control}
                name={`product.variants.${variantIndex}.values.${optionIndex}`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-2">
                      <Input
                        className="w-full"
                        {...form.register(
                          `product.variants.${variantIndex}.values.${optionIndex}.value`
                        )}
                      />
                      <Button
                        disabled={optionIndex === 0 && options.length === 1}
                        variant={"outline"}
                        onClick={() => remove(optionIndex)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            );
          })}
          <div>
            <Button
              className="my-2 mr-2"
              onClick={() => {
                append({
                  id: `new-${Math.random()}`,
                  value: "",
                  variantId: variant.id,
                });
              }}
            >
              Add option
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </>
    );
  }
}
