import { createContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export const ExistingVariantContext = createContext({
  variantId: "",
  productId: "",
  name: "",
  initialOptions: [] as { id: string; value: string; variantId: string }[],
  newOptions: {} as Record<string, string>,
  changeName: (name: string) => {},
  addOption: (value: string) => {},
  deleteOption: (id: string) => {},
  changeOption: (id: string, newValue: string) => {},
  clearNewOptions: () => {},
});

export function ExistingVariantProvider({
  children,
  variantId,
  productId,
  initialName,
  initialOptions,
}: {
  initialName: string;
  initialOptions: { id: string; value: string; variantId: string }[];
  children: React.ReactNode;
  variantId: string;
  productId: string;
}) {
  const [name, setName] = useState(initialName);
  const [newOptions, setNewOptions] = useImmer<Record<string, string>>(
    {}
    // const options = {} as Record<string, string>;
    // initialOptions.forEach((option) => {
    //   const { id, value, variantId } = option;
    //   options[id] = value;
    // });
    // return options;
  );

  const changeName = (name: string) => {
    setName(name);
  };

  const addOption = (value: string) => {
    setNewOptions((draft) => {
      const id = Math.random().toString();
      draft[id] = value;
    });
  };

  const deleteOption = (id: string) => {
    setNewOptions((draft) => {
      delete draft[id];
    });
  };

  const changeInitialOption = (id: string, newValue: string) => {};
  const changeOption = (id: string, newValue: string) => {
    setNewOptions((draft) => {
      draft[id] = newValue;
    });
  };

  const clearNewOptions = () => setNewOptions({});
  return (
    <ExistingVariantContext.Provider
      value={{
        productId,
        variantId,
        name,
        initialOptions,
        newOptions,
        changeName,
        addOption,
        deleteOption,
        changeOption,
        clearNewOptions,
      }}
    >
      {children}
    </ExistingVariantContext.Provider>
  );
}
