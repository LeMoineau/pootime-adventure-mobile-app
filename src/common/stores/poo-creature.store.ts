import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { colors } from "../utils/color-utils";
import { DataInStorage } from "../types/dataInStorage";
import { DefaultValues } from "../types/defaultValues";

type Store = {
  name: string;
  bodyColor: string;
  setName: (newname: string) => void;
  setBodyColor: (newColor: string) => void;
};

export const usePooCreatureStore = create<Store>((set) => {
  const { getJson, saveItemInJson, saveJson } = useStorage();

  getJson(StorageKeys.POO_CREATURE_STYLE).then(async (json) => {
    if (json) {
      const style = json as DataInStorage.PooCreatureStyle;
      set({ name: style.name, bodyColor: style.bodyColor });
    } else {
      await saveJson(StorageKeys.POO_CREATURE_STYLE, {
        name: DefaultValues.PooCreatureName,
        bodyColor: DefaultValues.PooCreatureBodyColor,
      } as DataInStorage.PooCreatureStyle);
    }
  });

  const setName = async (newName: string) => {
    set({ name: newName });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, "name", newName);
  };

  const setBodyColor = async (newColor: string) => {
    set({ bodyColor: newColor });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, "bodyColor", newColor);
  };

  return {
    name: DefaultValues.PooCreatureName,
    bodyColor: DefaultValues.PooCreatureBodyColor,
    setName,
    setBodyColor,
  };
});
