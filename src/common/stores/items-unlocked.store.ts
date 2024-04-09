import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../config/StorageKeys";
import { UnlockableItems } from "../types/shop/UnlockableItems";
import { DefaultValues } from "../config/DefaultValues";
import { ObjectUtils } from "../utils/object-utils";
import { DataInStorage } from "../types/dataInStorage";

type Store = {
  unlock: (item: UnlockableItems, name: string, value?: any) => Promise<void>;
  isUnlocked: (item: UnlockableItems, name: string) => boolean;
  resetData: () => Promise<void>;
} & DataInStorage.ItemsUnlocked;

export const useItemsUnlockedStore = create<Store>((set, get) => {
  const { getJson, addItemInObjectInJson, saveJson } = useStorage();

  getJson(StorageKeys.ITEMS_UNLOCKED).then(async (json: any) => {
    const baseValues = {
      ...DefaultValues.ItemsUnlocked,
      ...json,
    };
    set(baseValues);
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.ITEMS_UNLOCKED, baseValues);
    }
  });

  const unlock = async (item: UnlockableItems, name: string, value?: any) => {
    if (isUnlocked(item, name) && value === undefined) {
      return;
    }
    set({
      [item]: { ...get()[item], [name]: value === undefined ? true : value },
    });
    await addItemInObjectInJson(
      StorageKeys.ITEMS_UNLOCKED,
      item,
      name,
      value === undefined ? true : value
    );
  };

  const isUnlocked = (item: UnlockableItems, name: string): boolean => {
    return get()[item][name] === true;
  };

  const resetData = async () => {
    await saveJson(StorageKeys.ITEMS_UNLOCKED, DefaultValues.ItemsUnlocked);
    set({ ...DefaultValues.ItemsUnlocked });
  };

  return {
    ...DefaultValues.ItemsUnlocked,
    unlock,
    isUnlocked,
    resetData,
  };
});
