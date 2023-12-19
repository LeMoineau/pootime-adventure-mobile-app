import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DataInStorage } from "../types/dataInStorage";

type Store = {
  stars: number;
  pooCoins: number;
  earnStar: (val: number) => Promise<void>;
  earnPooCoin: (val: number) => Promise<void>;
  spendStar: (
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => Promise<void>;
  spendPooCoin: (
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => Promise<void>;
};

export const useResourcesStore = create<Store>((set, get) => {
  const { getJson, saveJson, saveItemInJson } = useStorage();

  getJson(StorageKeys.RESOURCES).then((json) => {
    if (json) {
      const resources = json as DataInStorage.Resources;
      set({
        stars: resources.stars,
        pooCoins: resources.pooCoins,
      });
    } else {
      saveJson(StorageKeys.RESOURCES, {
        stars: 0,
        pooCoins: 0,
      } as DataInStorage.Resources);
    }
  });

  const earnStar = async (val: number) => {
    set((state) => ({ stars: state.stars + val }));
    await saveItemInJson(StorageKeys.RESOURCES, "stars", get().stars);
  };

  const earnPooCoin = async (val: number) => {
    set((state) => ({ pooCoins: state.pooCoins + val }));
    await saveItemInJson(StorageKeys.RESOURCES, "pooCoins", get().pooCoins);
  };

  const spendStar = async (
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => {
    if (get().stars >= val) {
      set((state) => ({ stars: state.stars - val }));
      await saveItemInJson(StorageKeys.RESOURCES, "stars", get().stars);
      onSuccess && onSuccess(get().stars);
    } else {
      onFailed && onFailed(get().stars);
    }
  };

  const spendPooCoin = async (
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => {
    if (get().pooCoins >= val) {
      set((state) => ({ pooCoins: state.pooCoins - val }));
      await saveItemInJson(StorageKeys.RESOURCES, "pooCoins", get().pooCoins);
      onSuccess && onSuccess(get().pooCoins);
    } else {
      onFailed && onFailed(get().pooCoins);
    }
  };

  return {
    stars: 0,
    pooCoins: 0,
    earnStar,
    earnPooCoin,
    spendStar,
    spendPooCoin,
  };
});
