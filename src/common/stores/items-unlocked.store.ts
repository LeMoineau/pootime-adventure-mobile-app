import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { ArrayUtils } from "../utils/array-utils";
import { DataInStorage } from "../types/dataInStorage";
import { UnlockableItems } from "../types/UnlockableItems";

type Store = {
  bodyColors: string[];
  heads: string[];
  expressions: string[];
  ultis: string[];
  events: string[];
  unlock: (item: UnlockableItems, value: string) => Promise<void>;
};

export const useItemsUnlockedStore = create<Store>((set, get) => {
  const { getJson, addItemInObjectInJson, saveJson } = useStorage();

  getJson(StorageKeys.ITEMS_UNLOCKED).then(async (json: any) => {
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
    unlock,
  };
});
