import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { ArrayUtils } from "../utils/array-utils";
import { DataInStorage } from "../types/dataInStorage";

type Store = {
  bodyColorsUnlocked: string[];
  expressionUnlocked: string[];
  unlockBodyColors: (color: string) => Promise<void>;
  unlockExpression: (expression: string) => Promise<void>;
};

export const useItemsUnlockedStore = create<Store>((set, get) => {
  const { getJson, addItemInObjectInJson, saveJson } = useStorage();

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
      expressionUnlocked: Object.keys(itemsUnlocked.expressions),
    });
  };

  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.ITEMS_UNLOCKED, {
      bodyColors: {},
      expressions: {},
    } as DataInStorage.ItemsUnlocked);
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

  return {
    bodyColorsUnlocked: [],
    expressionUnlocked: [],
    unlockBodyColors,
    unlockExpression,
  };
});
