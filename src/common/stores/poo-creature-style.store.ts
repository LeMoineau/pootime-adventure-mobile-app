import { create } from "zustand";
import useStorage from "../../hooks/use-storage";
import { StorageKeys } from "../../config/StorageKeys";
import { DefaultValues } from "../../config/DefaultValues";
import { ObjectUtils } from "../../utils/object-utils";
import { DataInStorage } from "../../types/dataInStorage";
import { StyleKeys } from "../../types/poo-creature-style/StyleKeys";

export type PooCreatureStyleStore = {
  update: (style: StyleKeys, name: string) => Promise<void>;
  resetData: () => Promise<void>;
  getStyle: (style: StyleKeys) => any;
  loadData: (data: DataInStorage.PooCreatureStyle) => Promise<void>;
} & DataInStorage.PooCreatureStyle;

export const usePooCreatureStyleStore = create<PooCreatureStyleStore>(
  (set, get) => {
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
        DefaultValues.PooCreatureStyle,
      );
      set({ ...DefaultValues.PooCreatureStyle });
    };

    const loadData = async (data: DataInStorage.PooCreatureStyle) => {
      await saveJson(StorageKeys.POO_CREATURE_STYLE, data);
      set({ ...data });
    };

    const getStyle = (style: StyleKeys): any => {
      return get()[style];
    };

    return {
      ...DefaultValues.PooCreatureStyle,
      update,
      resetData,
      getStyle,
      loadData,
    };
  },
);
