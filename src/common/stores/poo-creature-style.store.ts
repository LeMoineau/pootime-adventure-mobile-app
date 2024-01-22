import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DefaultValues } from "../config/DefaultValues";
import { DataInStorage } from "../types/dataInStorage";

export type PooCreatureStyleStore = {
  name: string;
  bodyColor: string;
  head: string;
  expression: string;
  setName: (newname: string) => Promise<void>;
  setBodyColor: (newColor: string) => Promise<void>;
  setHead: (newHead: string) => Promise<void>;
  setExpression: (newExpression: string) => Promise<void>;
};

export const usePooCreatureStyleStore = create<PooCreatureStyleStore>((set) => {
  const { getJson, saveItemInJson, saveJson } = useStorage();

  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.POO_CREATURE_STYLE, {
      name: DefaultValues.PooCreatureName,
      bodyColor: DefaultValues.PooCreatureBodyColor,
      head: DefaultValues.PooHead,
      expression: DefaultValues.PooFace,
    } as DataInStorage.PooCreatureStyle);
  };

  getJson(StorageKeys.POO_CREATURE_STYLE).then(async (json) => {
    if (json) {
      loadSavedValues(json as DataInStorage.PooCreatureStyle);
    } else {
      await saveDefaultValues();
    }
  });

  const loadSavedValues = (style: DataInStorage.PooCreatureStyle) => {
    set({
      name: style.name,
      bodyColor: style.bodyColor,
      head: style.head,
      expression: style.expression,
    });
  };

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
    name: DefaultValues.PooCreatureName,
    bodyColor: DefaultValues.PooCreatureBodyColor,
    head: DefaultValues.PooHead,
    expression: DefaultValues.PooFace,
    setName,
    setBodyColor,
    setHead,
    setExpression,
  };
});
