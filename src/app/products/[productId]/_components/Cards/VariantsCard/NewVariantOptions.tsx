import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const NewVariantOptions = ({ variantIndex }: { variantIndex: number }) => {
  const form = useFormContext();
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    name: `newVariants.${variantIndex}.options`,
    control: form.control,
  });
  return (
    <div className="flex flex-col gap-1 px-6">
      {options.map((option, optionIndex) => {
        return (
          <FormField
            key={option.id}
            control={form.control}
            name={`newVariants.${variantIndex}.options.${optionIndex}`}
            render={({ field }) => (
              <FormItem className="">
                <div className="flex gap-2">
                  <Input
                    className="w-full"
                    {...form.register(
                      `newVariants.${variantIndex}.options.${optionIndex}.value`
                    )}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      options.length - 1 === optionIndex &&
                      append({ value: "" })
                    }
                  />
                  <Button
                    type="button"
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
          className="my-2"
          onClick={() => {
            append({ value: "" });
          }}
        >
          Add option
        </Button>
      </div>
    </div>
  );
};

export default NewVariantOptions;
