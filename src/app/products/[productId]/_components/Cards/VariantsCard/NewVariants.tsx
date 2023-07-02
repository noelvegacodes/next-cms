"use client";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useFieldArray } from "react-hook-form";

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
import { PlusIcon, Trash2 } from "lucide-react";
import { ProductContext } from "@/providers/Product";
import NewVariantOptions from "./NewVariantOptions";

export default function NewVariants() {
  const { form } = useContext(ProductContext);

  const {
    fields: newVariants,
    append,
    remove,
  } = useFieldArray({
    name: "newVariants",
    control: form.control,
  });

  return (
    <>
      {newVariants.map((variant, variantIndex) => (
        <div key={variant.id} className="py-4 border-b">
          <FormField
            control={form.control}
            name={`newVariants.${variantIndex}.type` as const}
            render={({ field }) => (
              <FormItem className="mb-4 px-6">
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
                  <Button
                    variant={"outline"}
                    onClick={() => remove(variantIndex)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </FormItem>
            )}
          />
          <NewVariantOptions variantIndex={variantIndex} />
        </div>
      ))}
      <div className="p-6">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => {
            append({ type: "", options: [{ value: "" }] });
          }}
        >
          <PlusIcon className="mr-4" />
          Add variant
        </Button>
      </div>
    </>
  );
}
