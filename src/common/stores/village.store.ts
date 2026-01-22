import { create } from "zustand";
import { DefaultValues } from "../config/DefaultValues";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../config/StorageKeys";
import { ObjectUtils } from "../utils/object-utils";
import { DataInStorage } from "../config/DataInStorage";
import { UpgradeInfos } from "../../types/village/StructureCost";
import {
  StructureDetail,
  StructureDetailName,
} from "../../types/village/StructureDetail";
import { StructureName } from "../config/constants/Structures";

type Store = {
  selectedStructureName?: StructureName;
  get: (structureName: StructureName) => DataInStorage.Structure;
  getName: () => string;
  saveDetail: (
    structureName: StructureName,
    detailName: StructureDetailName,
    detail: StructureDetail,
  ) => Promise<void>;
  getDetail: (
    structureName: StructureName,
    detailName: StructureDetailName,
  ) => StructureDetail | undefined;
  hasDetail: (
    structureName: StructureName,
    detailName: StructureDetailName,
  ) => boolean;
  eraseDetail: (
    structureName: StructureName,
    detailName: StructureDetailName,
  ) => Promise<void>;
  build: (structureName: StructureName) => Promise<void>;
  upgrade: (
    structureName: StructureName,
    upgradeInfos: UpgradeInfos,
  ) => Promise<void>;
  select: (selectedStructureName: StructureName) => void;
  change: (key: "name", val: string) => Promise<void>;
  resetData: () => Promise<void>;
  loadData: (data: DataInStorage.Village) => Promise<void>;
} & DataInStorage.Village;

export const useVillageStore = create<Store>((set, get) => {
  const { getJson, saveJson } = useStorage();

  getJson(StorageKeys.VILLAGE).then(async (json) => {
    const baseValues = { ...DefaultValues.Village, ...json };
    set(baseValues);
    if (
      json === null ||
      (json !== null && !ObjectUtils.equals(baseValues, json))
    ) {
      await saveJson(StorageKeys.VILLAGE, baseValues);
    }
  });

  const _get = (structureName: StructureName): DataInStorage.Structure => {
    return get().structures[structureName];
  };

  const saveDetail = async (
    structureName: StructureName,
    detailName: StructureDetailName,
    detail: StructureDetail,
  ) => {
    const village = get();
    village.structures[structureName].details[detailName] = detail;
    set({ ...village });
    await saveJson(StorageKeys.VILLAGE, village);
  };

  const getDetail = (
    structureName: StructureName,
    detailName: StructureDetailName,
  ): StructureDetail | undefined => {
    return get().structures[structureName].details[detailName];
  };

  const hasDetail = (
    structureName: StructureName,
    detailName: StructureDetailName,
  ): boolean => {
    return get().structures[structureName].details[detailName] !== undefined;
  };

  const eraseDetail = async (
    structureName: StructureName,
    detailName: StructureDetailName,
  ) => {
    const village = get();
    village.structures[structureName].details[detailName] = undefined;
    set({ ...village });
    await saveJson(StorageKeys.VILLAGE, village);
  };

  const upgrade = async (
    structureName: StructureName,
    upgradeInfos: UpgradeInfos,
  ) => {
    const json = await getJson(StorageKeys.VILLAGE);
    if (json !== null) {
      let village = json as DataInStorage.Village;
      village.structures[structureName].level = upgradeInfos.toLevel;
      set({ ...village });
      await saveJson(StorageKeys.VILLAGE, village);
    }
  };

  const build = async (structureName: StructureName) => {
    const json = await getJson(StorageKeys.VILLAGE);
    if (json !== null && json !== undefined) {
      let village = json as DataInStorage.Village;
      village.structures[structureName].level = 1;
      set({ ...village });
      await saveJson(StorageKeys.VILLAGE, village);
    }
  };

  const change = async (key: "name", val: string) => {
    const json = await getJson(StorageKeys.VILLAGE);
    if (json !== null && json !== undefined) {
      let village = json as DataInStorage.Village;
      village[key] = val;
      set({ ...village });
      await saveJson(StorageKeys.VILLAGE, village);
    }
  };

  const select = (selectedStructureName: StructureName) => {
    set({ selectedStructureName });
  };

  const resetData = async () => {
    set({ ...DefaultValues.Village });
    await saveJson(StorageKeys.VILLAGE, DefaultValues.Village);
  };

  const loadData = async (data: DataInStorage.Village) => {
    set({ ...data });
    await saveJson(StorageKeys.VILLAGE, data);
  };

  const getName = () => {
    return get().name;
  };

  return {
    ...DefaultValues.Village,
    get: _get,
    saveDetail,
    getDetail,
    hasDetail,
    eraseDetail,
    build,
    upgrade,
    select,
    change,
    resetData,
    getName,
    loadData,
  };
});
