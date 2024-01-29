import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DataInStorage } from "../types/dataInStorage";
import { DefaultValues } from "../config/DefaultValues";
import { Resources } from "../types/Resources";
import { ObjectUtils } from "../utils/object-utils";

type Store = {
  earn: (resource: Resources, val: number) => Promise<void>;
  spend: (
    resource: Resources,
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => Promise<void>;
  resetData: () => Promise<void>;
} & DataInStorage.Resources;

export const useResourcesStore = create<Store>((set, get) => {
  const { getJson, saveJson, saveItemInJson } = useStorage();

  getJson(StorageKeys.RESOURCES).then(async (json) => {
    const baseValues = {
      ...DefaultValues.Resources,
      ...json,
    };
    set(baseValues);
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.RESOURCES, baseValues);
    }
  });

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

  const resetData = async () => {
    await saveJson(StorageKeys.RESOURCES, DefaultValues.Resources);
    set({ ...DefaultValues.Resources });
  };

  return {
    ...DefaultValues.Resources,
    earn,
    spend,
    resetData,
  };
});
