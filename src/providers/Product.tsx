"use client";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Variant, VariantValue, Product, ProductImage } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import {
  deleteVariantOptions,
  deleteVariants,
  insertNewVariants,
  insertVariantOptions,
  revalidate,
  updateProduct,
} from "@/actions/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface VariantWithValues extends Variant {
  options: VariantValue[];
}

export interface ProductWithImagesVariants extends Product {
  images: ProductImage[];
  variants: VariantWithValues[];
}

type FormValues = {
  product: Product;
  images: ProductImage[];
  variants: VariantWithValues[];
  variantsToDelete: string[];
  variantOptionsToDelete: string[];
  variantOptionsToAdd: string[];
  newVariants: { type: string; options: { value: string }[] }[];
};

export function ProductProvider({
  product,
  images,
  variants,
  children,
}: {
  product: Product;
  images: ProductImage[];
  variants: VariantWithValues[];
  children: React.ReactNode;
}) {
  const [discardDialog, setDiscardDialog] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      product,
      images,
      variants,
      variantsToDelete: [],
      variantOptionsToDelete: [],
      variantOptionsToAdd: [],
      newVariants: [],
    },
  });

  useEffect(() => {
    form.reset({
      product,
      images,
      variants,
      newVariants: [],
      variantOptionsToDelete: [],
      variantOptionsToAdd: [],
      variantsToDelete: [],
    });
  }, [product, images, variants]);

  const onSubmit = async (data: FormValues) => {
    const {
      product,
      images,
      variants,
      newVariants,
      variantsToDelete,
      variantOptionsToDelete,
    } = form.formState.dirtyFields;

    console.log("dirty fields", form.formState.dirtyFields);

    if (Object.values(product!).find((isDirty) => isDirty)) {
      console.log("product is dirty");
      console.log(product);
      await updateProduct(data.product);
    }

    if (images?.length) {
      console.log("images changed");
    }

    if (newVariants?.length) {
      console.log("new variants marked for insertion");
      await insertNewVariants(data.product.id, data.newVariants);
    }

    if (variants?.length) {
      console.log("variants were changed");

      const newOptions = data.variants.flatMap((variant) =>
        variant.options.filter((option) => option.id.startsWith("new-"))
      );

      if (newOptions.length) {
        await insertVariantOptions(newOptions);
      }

      if (variantOptionsToDelete?.length) {
        console.log("variant options were marked for deletion");
        await deleteVariantOptions(data.variantOptionsToDelete);
      }

      if (variantsToDelete?.length) {
        console.log("variants marked for deletion");
        await deleteVariants(data.variantsToDelete);
      }
    }

    revalidate("/product/" + data.product.id);
  };

  const handleDiscardChanges = () => {
    form.reset(form.formState.defaultValues);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
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
                <Dialog onOpenChange={setDiscardDialog} open={discardDialog}>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-white"
                    >
                      Discard
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Discard changes</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to discard your changes ?</p>
                    <div className="flex gap-2">
                      <Button onClick={() => setDiscardDialog(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setDiscardDialog(false);
                          handleDiscardChanges();
                        }}
                      >
                        Discard
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800"
                >
                  Save
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <DevTool control={form.control} />
      </form>
    </Form>
  );
}
