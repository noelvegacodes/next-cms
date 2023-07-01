import { createContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export const NewVariantContext = createContext({
  productId: "",
  type: "",
  options: {} as Record<string, string>,
  changeType: (type: string) => {},
  addOption: (value: string) => {},
  deleteOption: (id: string) => {},
  changeOption: (id: string, newValue: string) => {},
});

export function NewVariantProvider({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
}) {
  const [type, setType] = useState("");
  const [options, setOptions] = useImmer<Record<string, string>>({});

  useEffect(() => {
    console.log("options updated", options);
  }, [name, options]);

  const changeType = (name: string) => {
    setType(name[0].toUpperCase() + name.substring(1));
  };

  const addOption = (value: string) => {
    setOptions((draft) => {
      const id = Math.random().toString();
      draft[id] = value;
    });
  };

  const deleteOption = (id: string) => {
    setOptions((draft) => {
      delete draft[id];
    });
  };

  const changeOption = (id: string, newValue: string) => {
    setOptions((draft) => {
      draft[id] = newValue;
    });
  };
  return (
    <NewVariantContext.Provider
      value={{
        productId,
        type,
        options,
        changeType,
        addOption,
        deleteOption,
        changeOption,
      }}
    >
      {children}
    </NewVariantContext.Provider>
  );
}
