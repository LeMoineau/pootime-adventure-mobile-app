import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DataInStorage } from "../types/dataInStorage";
import { DefaultValues } from "../types/defaultValues";
import { JSONObject } from "../types/JSONObject";
import { StatType } from "../types/Stats";
import { MathUtils } from "../utils/math-utils";

type Store = {
  level: number;
  currentExp: number;
  attaque: number;
  defense: number;
  pv: number;
  mana: number;
  resMana: number;
  recupMana: number;
  incrStat: (stat: StatType) => Promise<void>;
};

export const usePooCreatureStatsStore = create<Store>((set, get) => {
  const { getJson, saveItemInJson, saveJson } = useStorage();

  getJson(StorageKeys.POO_CREATURE_STATS).then(async (json) => {
    if (json) {
      console.log(json as JSONObject);
      loadSavedValues(json as DataInStorage.PooCreatureStats);
    } else {
      await saveDefaultValues();
    }
  });

  const loadSavedValues = (stats: DataInStorage.PooCreatureStats) => {
    set({
      level: stats.level,
      currentExp: stats.currentExp,
      attaque: stats.attaque,
      defense: stats.defense,
      pv: stats.pv,
      mana: stats.mana,
      resMana: stats.resMana,
      recupMana: stats.recupMana,
    });
  };

  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.POO_CREATURE_STATS, {
      ...DefaultValues.PooCreatureStats,
    } as DataInStorage.PooCreatureStats);
  };

  const incrStat = async (stat: StatType) => {
    const gain = MathUtils.calculateGainStat(stat, get()[stat]);
    set((state) => ({ [stat]: state[stat] + gain }));
    await saveItemInJson(StorageKeys.POO_CREATURE_STATS, stat, get()[stat]);
  };

  return {
    ...(DefaultValues.PooCreatureStats as Store),
    incrStat,
  };
});
