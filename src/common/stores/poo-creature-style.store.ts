import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DefaultValues } from "../config/DefaultValues";
import { ObjectUtils } from "../utils/object-utils";
import { DataInStorage } from "../types/dataInStorage";

export type PooCreatureStyleStore = {
  setName: (newname: string) => Promise<void>;
  setBodyColor: (newColor: string) => Promise<void>;
  setHead: (newHead: string) => Promise<void>;
  setExpression: (newExpression: string) => Promise<void>;
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

  const setName = async (newName: string) => {
    set({ name: newName });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, "name", newName);
  };

  const setBodyColor = async (newColor: string) => {
    set({ bodyColor: newColor });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, "bodyColor", newColor);
  };

  const setHead = async (newHead: string) => {
    set({ head: newHead });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, "head", newHead);
  };

  const setExpression = async (newExpression: string) => {
    set({ expression: newExpression });
    await saveItemInJson(
      StorageKeys.POO_CREATURE_STYLE,
      "expression",
      newExpression
    );
  };

  return {
    ...DefaultValues.PooCreatureStyle,
    setName,
    setBodyColor,
    setHead,
    setExpression,
  };
});
