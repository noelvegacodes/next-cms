"use client";
import { removeVariant } from "@/actions/product";
import { createContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export const VariantContext = createContext({
  takenNames: [] as string[],
  variants: [],
  deleteVariant: (variantId: string) => {},
  newVariants: new Map<
    string,
    { name: string; options: Record<string, string> }
  >(),
  addNewVariant: () => {},
  productId: "",
  deleteNewVariant: (variantId: string) => {},
  updateNewVariantName: (variantId: string, value: string) => {},
  updateNewVariantOption: (
    variantId: string,
    optionId: string,
    value: string
  ) => {},
});

export function VariantsProvider({
  children,
  variants,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
  variants: any;
}) {
  const [takenNames, setTakenNames] = useState<string[]>([]);
  const [newVariants, setNewVariants] = useImmer<
    Map<string, { name: string; options: Record<string, string> }>
  >(new Map());

  useEffect(() => {
    console.log("taken names", takenNames);
  }, [takenNames]);

  useEffect(() => {
    const newVariantNames = [...newVariants.values()]
      .map((v) => v.name)
      .filter((name) => name !== "");
    const variantNames = variants.map((variant: any) => variant.name);
    setTakenNames([...newVariantNames, ...variantNames]);
  }, [newVariants, variants]);

  useEffect(() => {
    console.log("taken Names", takenNames);
  }, [takenNames]);

  const deleteVariant = async (variantId: string) => {
    await removeVariant(productId, variantId);
  };
  const deleteNewVariant = (variantId: string) => {
    setNewVariants((draft) => {
      draft.delete(variantId);
      return draft;
    });
  };
  const test = (id: string) => {
    let defaultValue = "";
    const names = ["style", "material", "size", "color"];
    names.forEach((name) => {
      const taken = takenNames.find((takenName) => takenName === name);
      if (!taken) {
        defaultValue = name;
        return;
      }
    });
    return defaultValue;
  };
  const addNewVariant = () => {
    const id = Math.random().toString();
    setNewVariants((draft) => {
      draft.set(id, { name: test(id), options: {} });
      return draft;
    });
  };

  const updateNewVariantName = (variantId: string, value: string) => {
    setNewVariants((draft) => {
      const variant = draft.get(variantId);
      if (variant) {
        variant["name"] = value;
      }
    });
  };

  const updateNewVariantOption = (
    variantId: string,
    optionId: string,
    value: string
  ) => {
    setNewVariants((draft) => {
      const variant = draft.get(variantId);
      if (variant) {
        variant.options[optionId] = value;
      }
    });
  };
  return (
    <VariantContext.Provider
      value={{
        takenNames,
        variants,
        deleteVariant,
        addNewVariant,
        newVariants,
        productId,
        deleteNewVariant,
        updateNewVariantName,
        updateNewVariantOption,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
}
