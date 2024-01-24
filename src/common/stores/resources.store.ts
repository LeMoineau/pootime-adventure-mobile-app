import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DataInStorage } from "../types/dataInStorage";
import { DefaultValues } from "../config/DefaultValues";
import { Resources } from "../types/Resources";

type Store = {
  stars: number;
  pooCoins: number;
  wool: number;
  earn: (resource: Resources, val: number) => Promise<void>;
  spend: (
    resource: Resources,
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => Promise<void>;
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

  getJson(StorageKeys.RESOURCES).then(async (json) => {
    if (json) {
      loadSavedValues(json as DataInStorage.Resources);
    } else {
      await saveDefaultValues();
    }
  });

  const loadSavedValues = (json: DataInStorage.Resources) => {
    const resources = json as DataInStorage.Resources;
    set({
      stars: resources.stars,
      pooCoins: resources.pooCoins,
      wool: resources.wool,
    });
  };

  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.RESOURCES, {
      stars: DefaultValues.Star,
      pooCoins: DefaultValues.PooCoins,
      wool: DefaultValues.Wool,
    } as DataInStorage.Resources);
  };

  const earn = async (resource: Resources, val: number) => {
    set((state) => ({ [resource]: state[resource] + val }));
    await saveItemInJson(StorageKeys.RESOURCES, resource, get()[resource]);
  };

  const spend = async (
    resource: Resources,
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => {
    if (get()[resource] >= val) {
      set((state) => ({ [resource]: state[resource] - val }));
      await saveItemInJson(StorageKeys.RESOURCES, resource, get()[resource]);
      onSuccess && onSuccess(get()[resource]);
    } else {
      onFailed && onFailed(get()[resource]);
    }
  };

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
    stars: DefaultValues.Star,
    pooCoins: DefaultValues.PooCoins,
    wool: DefaultValues.Wool,
    earnStar,
    earnPooCoin,
    spendStar,
    spendPooCoin,
    earn,
    spend,
  };
});
