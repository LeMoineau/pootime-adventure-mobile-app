import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../config/StorageKeys";
import { UnlockableItems } from "../types/shop/UnlockableItems";
import { DefaultValues } from "../config/DefaultValues";
import { ObjectUtils } from "../utils/object-utils";
import { DataInStorage } from "../types/dataInStorage";

type Store = {
  loading: boolean;
  unlock: (item: UnlockableItems, name: string, value?: any) => Promise<void>;
  isUnlocked: (item: UnlockableItems, name: string) => boolean;
  resetData: () => Promise<void>;
  getItemsByCategories: (categorie: keyof DataInStorage.ItemsUnlocked) => any;
  loadData: (data: DataInStorage.ItemsUnlocked) => Promise<void>;
} & DataInStorage.ItemsUnlocked;

export const useItemsUnlockedStore = create<Store>((set, get) => {
  const { getJson, addItemInObjectInJson, saveJson, saveItemInJson } =
    useStorage();

  getJson(StorageKeys.ITEMS_UNLOCKED).then(async (json: any) => {
    const baseValues = {
      ...DefaultValues.ItemsUnlocked,
      ...(DataInStorage.isItemsUnlocked(json)
        ? json
        : DataInStorage.convertOldItemsUnlockedToNewType(json)),
    };
    set(baseValues);
    set({ loading: false });
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.ITEMS_UNLOCKED, baseValues);
    }
  });

  const unlock = async (item: UnlockableItems, name: string, value?: any) => {
    if (isUnlocked(item, name) && value === undefined) {
      return;
    }
    if (item === "options") {
      const newOptions = { ...get().options };
      newOptions[name] = value === undefined ? true : value;
      set({ options: newOptions });
      saveItemInJson(StorageKeys.ITEMS_UNLOCKED, "options", newOptions);
    } else {
      const newItems = [...get()[item]];
      newItems.push(name);
      set({
        [item]: newItems,
      });
      saveItemInJson(StorageKeys.ITEMS_UNLOCKED, item, newItems);
    }
  };

  const isUnlocked = (item: UnlockableItems, name: string): boolean => {
    if (item === "options") return get().options[name] === true;
    return get()[item].includes(name);
  };

  const resetData = async () => {
    await saveJson(StorageKeys.ITEMS_UNLOCKED, DefaultValues.ItemsUnlocked);
    set({ ...DefaultValues.ItemsUnlocked });
  };

  const loadData = async (data: DataInStorage.ItemsUnlocked) => {
    await saveJson(StorageKeys.ITEMS_UNLOCKED, data);
    set({ ...data });
  };

  const getItemsByCategories = (
    categorie: keyof DataInStorage.ItemsUnlocked,
  ) => {
    return get()[categorie];
  };

  return {
    ...DefaultValues.ItemsUnlocked,
    loading: true,
    unlock,
    isUnlocked,
    resetData,
    getItemsByCategories,
    loadData,
  };
});
