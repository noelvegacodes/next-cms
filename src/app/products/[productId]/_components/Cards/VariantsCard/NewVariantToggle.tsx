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
import { PlusIcon, Trash2 } from "lucide-react";
import { insertVariant } from "@/actions/product";

type VariantFormValues = {
  type: string;
  options: { value: string }[];
};
export default function NewVariantToggle({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const form = useForm<VariantFormValues>({
    defaultValues: { type: "", options: [{ value: "" }] },
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
    console.log("Form submitted\n", data);
    await insertVariant(data.type, productId, data.options);
    form.reset();
    toggleOpen();
  };
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    console.log("errors", form.formState.errors);
  }, [form.formState.errors]);

  if (!open) {
    return (
      <div className="px-6 py-4">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={toggleOpen}
        >
          <PlusIcon className="mr-4" />
          Add variant
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className="p-6"
        noValidate
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
