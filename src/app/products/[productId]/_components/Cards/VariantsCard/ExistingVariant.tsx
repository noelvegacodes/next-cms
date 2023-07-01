"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
  Form,
  FormMessage,
} from "@/components/ui/form";
import { GripHorizontal, GripVertical, Trash2 } from "lucide-react";
import { deleteVariant, insertVariant, revalidate } from "@/actions/product";
import { Badge } from "@/components/ui/badge";

type VariantFormValues = {
  type: string;
  options: { value: string }[];
};
export default function ExistingVariant({
  variantId,
  productId,
  defaultValues,
}: {
  variantId: string;
  productId: string;
  defaultValues: VariantFormValues;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<VariantFormValues>({
    defaultValues: defaultValues,
  });

  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    name: "options",
    control: form.control,
  });

  const onSubmit = async (data: VariantFormValues) => {
    deleteVariant(variantId);
    insertVariant(data.type, productId, data.options);
  };
  const toggleOpen = () => {
    setOpen(!open);
  };

  if (!open) {
    return (
      <article className="border-b p-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <GripVertical size={20} />
          <div>
            <h6 className="capitalize mb-1 font-medium text-sm">
              {defaultValues.type}
            </h6>
            <ul className="flex gap-1">
              {defaultValues.options.map(({ value }) => {
                return (
                  <Badge variant="secondary" key={value}>
                    {value}
                  </Badge>
                );
              })}
            </ul>
          </div>
        </div>
        <Button variant="outline" onClick={toggleOpen}>
          Edit
        </Button>
      </article>
    );
  }

  return (
    <Form {...form}>
      <form
        className="p-6 border-b"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="mb-4">
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
                  type="button"
                  variant={"outline"}
                  onClick={async () => {
                    console.log("delete variant: ", variantId);
                    await deleteVariant(variantId);
                    await revalidate("/products/" + productId);
                    toggleOpen();
                  }}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </FormItem>
          )}
        />
        <FormItem className="mb-6">
          <FormLabel>Options</FormLabel>
          {options.map((option, index) => (
            <div key={option.id}>
              <div className="flex gap-2">
                <Input
                  placeholder="new option"
                  {...form.register(`options.${index}.value` as const, {
                    validate: {
                      required: (fieldValue) => {
                        console.log("hello");
                        return fieldValue.trim() !== "" || "option is empty";
                      },
                    },
                  })}
                />
                {options.length > 1 && (
                  <Button variant={"outline"} onClick={() => remove(index)}>
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>
              <FormMessage>
                {form.formState.errors?.["options"]?.[index]?.value?.message}
              </FormMessage>
            </div>
          ))}
        </FormItem>

        <div className="flex justify-between">
          <div>
            <Button
              variant="destructive"
              type="submit"
              className="mr-2"
              onClick={() => {
                form.reset();
                toggleOpen();
              }}
            >
              Cancel
            </Button>

            <Button
              variant={"outline"}
              type="submit"
              disabled={!form.formState.isValid}
            >
              Done
            </Button>
          </div>
          <Button type="button" onClick={() => append({ value: "" })}>
            + Add option
          </Button>
        </div>
      </form>
    </Form>
  );
}
