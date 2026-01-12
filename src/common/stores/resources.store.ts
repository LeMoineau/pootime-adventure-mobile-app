import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../config/StorageKeys";
import { DefaultValues } from "../config/DefaultValues";
import { ObjectUtils } from "../utils/object-utils";
import { Inventory } from "../types/resources/Inventory";
import { Resources } from "../config/constants/Resources";

type Store = {
  inventory: Inventory;
  earn: (resource: Resources, val: number) => Promise<void>;
  earnMany: (earnings: [Resources, number][]) => void;
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
      saveJson(StorageKeys.INVENTORY, baseValues);
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
    saveItemInJson(StorageKeys.INVENTORY, resource, _get(resource));
  };

  const earnMany = (earnings: [Resources, number][]) => {
    const newInv = { ...get().inventory };
    for (let e of earnings) {
      newInv[e[0]] += e[1];
    }
    set({ inventory: newInv });
    saveJson(StorageKeys.INVENTORY, newInv);
  };

  const spend = async (
    resource: Resources,
    val: number,
    onSuccess?: (newVal: number) => void,
    onFailed?: (val: number) => void
  ) => {
    let currentInv = { ...get().inventory };
    if (currentInv[resource] >= val) {
      currentInv[resource] -= val;
      set({ inventory: currentInv });
      saveJson(StorageKeys.INVENTORY, currentInv);
      onSuccess && onSuccess(currentInv[resource]);
    } else {
      onFailed && onFailed(currentInv[resource]);
    }
  };

  const spendMany = async (
    resources: Resources[],
    vals: number[],
    onSuccess?: () => void,
    onFailed?: () => void
  ) => {
    if (resources.length !== vals.length) {
      console.error(
        `resources array ${resources} and vals array ${vals} have not the same size`
      );
      onFailed && onFailed();
      return;
    }
    let newInv = { ...get().inventory };
    for (let i = 0; i < resources.length; i++) {
      if (newInv[resources[i]] < vals[i]) {
        onFailed && onFailed();
        return;
      }
      newInv[resources[i]] -= vals[i];
    }
    set({ inventory: newInv });
    saveJson(StorageKeys.INVENTORY, newInv);
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
    earnMany,
    spend,
    spendMany,
    resetData,
    get: _get,
    loadData,
  };
});
