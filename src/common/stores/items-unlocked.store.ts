import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { ArrayUtils } from "../utils/array-utils";
import { DataInStorage } from "../types/dataInStorage";
import { DefaultValues } from "../config/DefaultValues";
import { UnlockableItems } from "../types/UnlockableItems";

type Store = {
  bodyColors: string[];
  heads: string[];
  expressions: string[];
  ultis: string[];
  events: string[];
  unlockBodyColors: (color: string) => Promise<void>;
  unlockHead: (head: string) => Promise<void>;
  unlockExpression: (expression: string) => Promise<void>;
  unlockUlti: (ulti: string) => Promise<void>;
  unlock: (item: UnlockableItems, value: string) => Promise<void>;
};

export const useItemsUnlockedStore = create<Store>((set, get) => {
  const { getJson, addItemInObjectInJson, saveJson } = useStorage();

  getJson(StorageKeys.ITEMS_UNLOCKED).then(async (json: any) => {
    await saveDefaultValues();
    return;
    if (json) {
      loadUnlockedItems(json as DataInStorage.ItemsUnlocked);
    } else {
      await saveDefaultValues();
    }
  });

  const loadUnlockedItems = (itemsUnlocked: DataInStorage.ItemsUnlocked) => {
    set({
      bodyColors: Object.keys(itemsUnlocked.bodyColors),
      heads: Object.keys(itemsUnlocked.heads),
      expressions: Object.keys(itemsUnlocked.expressions),
      ultis: Object.keys(itemsUnlocked.ultis),
      events: Object.keys(itemsUnlocked.events),
    });
  };

  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.ITEMS_UNLOCKED, {
      bodyColors: {},
      heads: {},
      expressions: {},
      ultis: {},
      events: {},
    } as DataInStorage.ItemsUnlocked);
  };

  const unlockBodyColors = async (color: string) => {
    if (get().bodyColors.includes(color)) {
      return;
    }
    set((state) => ({
      bodyColors: ArrayUtils.pushAndReturn(state.bodyColors, color),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "bodyColors",
      color,
      true
    );
  };

  const unlockHead = async (head: string) => {
    if (get().heads.includes(head)) {
      return;
    }
    set((state) => ({
      heads: ArrayUtils.pushAndReturn(state.heads, head),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "heads",
      head,
      true
    );
  };

  const unlockExpression = async (expression: string) => {
    if (get().expressions.includes(expression)) {
      return;
    }
    set((state) => ({
      expressions: ArrayUtils.pushAndReturn(state.expressions, expression),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "expressions",
      expression,
      true
    );
  };

  const unlockUlti = async (ulti: string) => {
    if (get().ultis.includes(ulti)) {
      return;
    }
    set((state) => ({
      ultis: ArrayUtils.pushAndReturn(state.ultis, ulti),
    }));
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "ultis",
      ulti,
      true
    );
  };

  const unlock = async (item: UnlockableItems, value: string) => {
    if (get()[item].includes(value)) {
      return;
    }
    set((state) => ({
      ultis: ArrayUtils.pushAndReturn(state[item], value),
    }));
    await addItemInObjectInJson(StorageKeys.ITEMS_UNLOCKED, item, value, true);
  };

  return {
    bodyColors: [],
    heads: [],
    expressions: [],
    ultis: [],
    events: [],
    unlockBodyColors,
    unlockHead,
    unlockExpression,
    unlockUlti,
    unlock,
  };
});
