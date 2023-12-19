import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DataInStorage } from "../types/dataInStorage";
import { DefaultValues } from "../types/defaultValues";

type Store = {
  name: string;
  bodyColor: string;
  expression: string;
  setName: (newname: string) => Promise<void>;
  setBodyColor: (newColor: string) => Promise<void>;
  setExpression: (newExpression: string) => Promise<void>;
};

export const usePooCreatureStyleStore = create<Store>((set) => {
  const { getJson, saveItemInJson, saveJson } = useStorage();

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
      expression: style.expression,
    });
  };

  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.POO_CREATURE_STYLE, {
      name: DefaultValues.PooCreatureName,
      bodyColor: DefaultValues.PooCreatureBodyColor,
      expression: DefaultValues.PooFace,
    } as DataInStorage.PooCreatureStyle);
  };

  const setName = async (newName: string) => {
    set({ name: newName });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, "name", newName);
  };

  const setBodyColor = async (newColor: string) => {
    set({ bodyColor: newColor });
    await saveItemInJson(StorageKeys.POO_CREATURE_STYLE, "bodyColor", newColor);
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
    expression: DefaultValues.PooFace,
    setName,
    setBodyColor,
    setExpression,
  };
});
