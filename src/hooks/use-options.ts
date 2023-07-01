import { useImmer } from "use-immer";

export const useOptions = () => {
  const [optionsMap, setOptionsMap] = useImmer<
    Map<string, { id: string; value: string }>
  >(new Map());

  const deleteOption = (key: string) => {
    setOptionsMap((draft) => {
      draft.delete(key);
      return draft;
    });
  };

  const addOption = (value: string) => {
    setOptionsMap((draft) => {
      const id = Math.random().toString();
      draft.set(id, { id, value });
      return draft;
    });
  };

  const clearOptions = () => {
    setOptionsMap(new Map());
  };

  return {
    optionsCount: optionsMap.size,
    deleteOption,
    addOption,
    options: Array.from(optionsMap.values()),
    clearOptions,
  };
};
