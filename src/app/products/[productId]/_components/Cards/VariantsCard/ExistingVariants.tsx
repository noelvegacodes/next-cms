"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
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

export default function ExistingVariants() {
  const form = useFormContext();

  const { fields: variants, remove } = useFieldArray({
    name: `variants`,
    control: form.control,
    keyName: "id2",
  });

  const { append } = useFieldArray({
    name: `variantsToDelete`,
    control: form.control,
  });
  return (
    <>
      {variants.map((variant, index) => {
        // console.log("existing variant")

        return (
          <ExistingVariant
            key={variant.id}
            variant={variant}
            onDelete={() => {
              append(variant.id);
              remove(index);
            }}
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
  variant: { id: string; type: string; options: { value: string }[] };
  variantIndex: number;
  onDelete: () => void;
}) {
  // console.log("existing variant", variant);
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    name: `variants.${variantIndex}.options`,
    control: form.control,
    keyName: "id4",
  });

  const { append: addToVariantOptionsToDelete } = useFieldArray({
    name: `variantOptionsToDelete`,
    control: form.control,
    keyName: "id3",
  });

  const { append: variantOptionsToAdd } = useFieldArray({
    name: `variantOptionsToAdd`,
    control: form.control,
    keyName: "id2",
  });

  if (!open) {
    return (
      <article className="border-b p-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <GripVertical size={20} />
          <div>
            <h6 className="capitalize mb-1 font-medium text-sm">
              {variant.type}
            </h6>
            <ul className="flex gap-1">
              {variant.options.map(({ value }) => {
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
      <div className="border-b pb-6">
        <FormField
          control={form.control}
          name={`variants.${variantIndex}.type`}
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
          <FormLabel className="mb-2">Options</FormLabel>
          {options.map((option, optionIndex) => {
            console.log("variant option", option);
            return (
              <FormField
                key={option.id4}
                control={form.control}
                name={`variants.${variantIndex}.options.${optionIndex}`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-2">
                      <Input
                        className="w-full"
                        onKeyDown={(e) => {
                          e.key == "Enter" &&
                            options.length &&
                            append({
                              id: "new-",
                              value: "",
                              variantId: variant.id,
                            });
                        }}
                        {...form.register(
                          `variants.${variantIndex}.options.${optionIndex}.value`
                        )}
                      />
                      <Button
                        disabled={optionIndex === 0 && options.length === 1}
                        variant={"outline"}
                        onClick={() => {
                          addToVariantOptionsToDelete(option.id);
                          remove(optionIndex);
                        }}
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
              className="mt-2 mr-2"
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
      </div>
    );
  }
}
