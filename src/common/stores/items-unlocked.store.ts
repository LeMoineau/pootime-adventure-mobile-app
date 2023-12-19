import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { ArrayUtils } from "../utils/array-utils";
import { DataInStorage } from "../types/dataInStorage";

type Store = {
  bodyColorsUnlocked: string[];
  unlockBodyColors: (color: string) => void;
};

export const useItemsUnlockedStore = create<Store>((set, get) => {
  const { getJson, saveItemInJson, saveJson } = useStorage();

  getJson(StorageKeys.ITEMS_UNLOCKED).then(async (json) => {
    if (json) {
      const itemsUnlocked = json as DataInStorage.ItemsUnlocked;
      set({ bodyColorsUnlocked: Object.keys(itemsUnlocked.bodyColors) });
    } else {
      await saveJson(StorageKeys.ITEMS_UNLOCKED, {
        bodyColors: {},
      } as DataInStorage.ItemsUnlocked);
    }
  });

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
    const jsonStorage = (await getJson(
      StorageKeys.ITEMS_UNLOCKED
    )) as DataInStorage.ItemsUnlocked;
    await saveItemInJson(
      StorageKeys.ITEMS_UNLOCKED,
      "bodyColors",
      Object.assign(jsonStorage.bodyColors, { [color]: true })
    );
  };

  return {
    bodyColorsUnlocked: [],
    unlockBodyColors,
  };
});
