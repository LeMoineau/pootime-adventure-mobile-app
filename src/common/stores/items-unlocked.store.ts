import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { ArrayUtils } from "../utils/array-utils";
import { DataInStorage } from "../types/DataInStorage";
import { DefaultValues } from "../config/DefaultValues";

type Store = {
  bodyColorsUnlocked: string[];
  headsUnlocked: string[];
  expressionUnlocked: string[];
  ultiUnlocked: string[];
  unlockBodyColors: (color: string) => Promise<void>;
  unlockHead: (head: string) => Promise<void>;
  unlockExpression: (expression: string) => Promise<void>;
  unlockUlti: (ulti: string) => Promise<void>;
};

export const useItemsUnlockedStore = create<Store>((set, get) => {
  const { getJson, addItemInObjectInJson, saveJson } = useStorage();
  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.ITEMS_UNLOCKED, {
      bodyColors: {},
      heads: {},
      expressions: {},
      ultis: {},
    } as DataInStorage.ItemsUnlocked);
  };

  getJson(StorageKeys.ITEMS_UNLOCKED).then(async (json) => {
    if (json) {
      loadUnlockedItems(json as DataInStorage.ItemsUnlocked);
    } else {
      await saveDefaultValues();
    }
  });

  const loadUnlockedItems = (itemsUnlocked: DataInStorage.ItemsUnlocked) => {
    set({
      bodyColorsUnlocked: Object.keys(itemsUnlocked.bodyColors),
      headsUnlocked: Object.keys(itemsUnlocked.heads),
      expressionUnlocked: Object.keys(itemsUnlocked.expressions),
      ultiUnlocked: Object.keys(itemsUnlocked.ultis),
    });
  };

  const unlockBodyColors = async (color: string) => {
    if (get().bodyColorsUnlocked.includes(color)) {
      return;
    }
    set((state) => ({
      bodyColorsUnlocked: ArrayUtils.pushAndReturn(
        state.bodyColorsUnlocked,
        color
      ),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "bodyColors",
      color,
      true
    );
  };

  const unlockHead = async (head: string) => {
    if (get().headsUnlocked.includes(head)) {
      return;
    }
    set((state) => ({
      headsUnlocked: ArrayUtils.pushAndReturn(state.headsUnlocked, head),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "heads",
      head,
      true
    );
  };

  const unlockExpression = async (expression: string) => {
    if (get().expressionUnlocked.includes(expression)) {
      return;
    }
    set((state) => ({
      expressionUnlocked: ArrayUtils.pushAndReturn(
        state.expressionUnlocked,
        expression
      ),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "expressions",
      expression,
      true
    );
  };

  const unlockUlti = async (ulti: string) => {
    if (get().ultiUnlocked.includes(ulti)) {
      return;
    }
    set((state) => ({
      ultiUnlocked: ArrayUtils.pushAndReturn(state.ultiUnlocked, ulti),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "ultis",
      ulti,
      true
    );
  };

  return {
    bodyColorsUnlocked: [],
    headsUnlocked: [],
    expressionUnlocked: [],
    ultiUnlocked: [],
    unlockBodyColors,
    unlockHead,
    unlockExpression,
    unlockUlti,
  };
});
