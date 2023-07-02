"use client";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Variant, VariantValue, Product, ProductImage } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface VariantWithValues extends Variant {
  values: VariantValue[];
}

export interface ProductWithImagesVariants extends Product {
  images: ProductImage[];
  variants: VariantWithValues[];
}

type FormValues = {
  product: ProductWithImagesVariants;
  newVariants: { type: string; options: { value: string }[] }[];
};

export const ProductContext = createContext({
  product: {} as ProductWithImagesVariants,
  form: {} as UseFormReturn<FormValues, any, undefined>,
});

export function ProductProvider({
  initialProduct,
  children,
}: {
  initialProduct: ProductWithImagesVariants;
  children: React.ReactNode;
}) {
  const [product, setProduct] = useState(initialProduct);
  const form = useForm<FormValues>({
    defaultValues: {
      product,
      newVariants: [],
    },
  });

  useEffect(() => {
    setProduct(initialProduct);
    form.reset({
      product: initialProduct,
      newVariants: [],
    });
  }, [initialProduct]);

  const onSubmit = (data: FormValues) => {};

  const handleDiscardChanges = () => {
    console.log("discard changes");
    form.reset({
      product: initialProduct,
      newVariants: [],
    });
    console.log("values", form.getValues());
  };
  return (
    <ProductContext.Provider
      value={{
        product: product,
        form: form,
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {children}
          <AnimatePresence>
            {form.formState.isDirty && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "h-16 w-full bg-stone-800 z-10",
                  "fixed bottom-0 left-16",
                  "flex items-center justify-evenly"
                )}
              >
                <p className="text-white font-medium">Unsaved changes</p>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-white"
                    onClick={handleDiscardChanges}
                  >
                    Discard
                  </Button>
                  <Button
                    type="button"
                    onClick={async () => {
                      console.log(form.formState.dirtyFields);
                    }}
                    className="bg-emerald-700"
                  >
                    Save
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </ProductContext.Provider>
  );
}
