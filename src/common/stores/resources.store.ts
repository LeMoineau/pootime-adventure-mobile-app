import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../config/StorageKeys";
import { DataInStorage } from "../types/dataInStorage";
import { DefaultValues } from "../config/DefaultValues";
import { Resources } from "../common/config/constants/Resources";
import { ObjectUtils } from "../utils/object-utils";
import { Inventory } from "../types/resources/Inventory";

type Store = {
  inventory: Inventory;
  earn: (resource: Resources, val: number) => Promise<void>;
  spend: (
    resource: Resources,
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => Promise<void>;
  spendMany: (
    resources: Resources[],
    vals: number[],
    onSuccess?: () => void,
    onFailed?: () => void
  ) => Promise<void>;
  resetData: () => Promise<void>;
  get: (resource: Resources) => number;
  loadData: (data: Inventory) => Promise<void>;
};

export const useResourcesStore = create<Store>((set, get) => {
  const { getJson, saveJson, saveItemInJson, removeItem } = useStorage();

  getJson(StorageKeys.INVENTORY).then(async (json) => {
    await restoreOldData();
    const baseValues = {
      ...get().inventory,
      ...json,
    };
    set({ inventory: baseValues });
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.INVENTORY, baseValues);
    }
  });

  const restoreOldData = async () => {
    getJson(StorageKeys.RESOURCES).then(async (json) => {
      if (json !== null) {
        set({ inventory: { ...get().inventory, ...json } });
        await removeItem(StorageKeys.RESOURCES);
      }
    });
  };

  const earn = async (resource: Resources, val: number) => {
    set((state) => ({
      inventory: {
        ...get().inventory,
        [resource]: state.inventory[resource] + val,
      },
    }));
    await saveItemInJson(StorageKeys.INVENTORY, resource, _get(resource));
  };

  const spend = async (
    resource: Resources,
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => {
    if (_get(resource) >= val) {
      set((state) => ({
        inventory: {
          ...get().inventory,
          [resource]: state.inventory[resource] - val,
        },
      }));
      await saveItemInJson(StorageKeys.INVENTORY, resource, _get(resource));
      onSuccess && onSuccess(_get(resource));
    } else {
      onFailed && onFailed(_get(resource));
    }
  };

  const spendMany = async (
    resources: Resources[],
    vals: number[],
    onSuccess?: () => void,
    onFailed?: () => void
  ) => {
    if (resources.length !== vals.length) {
      onFailed && onFailed();
      return;
    }
    let index = 0;
    for (let r of resources) {
      if (_get(r) < vals[index]) {
        onFailed && onFailed();
        return;
      }
      index++;
    }
    index = 0;
    for (let r of resources) {
      await spend(r, vals[index]);
      index++;
    }
    onSuccess && onSuccess();
  };

  const resetData = async () => {
    await saveJson(StorageKeys.INVENTORY, DefaultValues.Inventory);
    set({ inventory: DefaultValues.Inventory });
  };

  const loadData = async (data: Inventory) => {
    await saveJson(StorageKeys.INVENTORY, data);
    set({ inventory: data });
  };

  const _get = (resource: Resources) => {
    return get().inventory[resource] ?? 0;
  };

  return {
    inventory: DefaultValues.Inventory,
    earn,
    spend,
    spendMany,
    resetData,
    get: _get,
    loadData,
  };
});
