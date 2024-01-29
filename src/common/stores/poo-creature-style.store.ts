import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DefaultValues } from "../config/DefaultValues";
import { ObjectUtils } from "../utils/object-utils";
import { DataInStorage } from "../types/dataInStorage";
import { StyleKeys } from "../types/StyleKeys";

export type PooCreatureStyleStore = {
  update: (style: StyleKeys, name: string) => Promise<void>;
  resetData: () => Promise<void>;
} & DataInStorage.PooCreatureStyle;

export const usePooCreatureStyleStore = create<PooCreatureStyleStore>((set) => {
  const { getJson, saveItemInJson, saveJson } = useStorage();

  getJson(StorageKeys.POO_CREATURE_STYLE).then(async (json) => {
    const baseValues = {
      ...DefaultValues.PooCreatureStyle,
      ...json,
    };
    set(baseValues);
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.POO_CREATURE_STYLE, baseValues);
    }
  });

  const update = async (style: StyleKeys, name: string) => {
    set({ [style]: name });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, style, name);
  };

  const resetData = async () => {
    await saveJson(
      StorageKeys.POO_CREATURE_STYLE,
      DefaultValues.PooCreatureStyle
    );
    set({ ...DefaultValues.PooCreatureStyle });
  };

  return {
    ...DefaultValues.PooCreatureStyle,
    update,
    resetData,
  };
});
