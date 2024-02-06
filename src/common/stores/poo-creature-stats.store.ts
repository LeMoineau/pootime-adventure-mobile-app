import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../utils/storage-keys";
import { DefaultValues } from "../config/DefaultValues";
import { StatType } from "../types/StatType";
import { MathUtils } from "../utils/math-utils";
import { ObjectUtils } from "../utils/object-utils";
import { DataInStorage } from "../types/dataInStorage";
import { CurveUtils } from "../utils/curve-utils";

export type PooCreatureStatsStore = {
  incrStat: (stat: StatType) => Promise<void>;
  selectUlti: (ulti: string) => Promise<void>;
  resetData: () => Promise<void>;
  calculateAllStarsSpent: () => number;
} & DataInStorage.PooCreatureStats;

export const usePooCreatureStatsStore = create<PooCreatureStatsStore>(
  (set, get) => {
    const { getJson, saveItemInJson, saveJson } = useStorage();

    getJson(StorageKeys.POO_CREATURE_STATS).then(async (json) => {
      const baseValues = {
        ...DefaultValues.PooCreatureStats,
        ...json,
      };
      set(baseValues);
      if (json === null || !ObjectUtils.equals(json, baseValues)) {
        await saveJson(StorageKeys.POO_CREATURE_STATS, baseValues);
      }
    });

    const incrStat = async (stat: StatType) => {
      const gain = MathUtils.calculateGainStat(stat, get()[stat]);
      set((state) => ({ [stat]: state[stat] + gain }));
      await saveItemInJson(StorageKeys.POO_CREATURE_STATS, stat, get()[stat]);
      await _incrExp();
    };

    const _incrExp = async () => {
      let currentExp = get().currentExp + 1;
      if (currentExp >= CurveUtils.calculateExpNeedForNextLevel(get().level)) {
        set((state) => ({ level: state.level + 1, currentExp: 0 }));
      } else {
        set({ currentExp: currentExp });
      }
      await saveItemInJson(
        StorageKeys.POO_CREATURE_STATS,
        "level",
        get().level
      );
      await saveItemInJson(
        StorageKeys.POO_CREATURE_STATS,
        "currentExp",
        get().currentExp
      );
    };

    const selectUlti = async (ulti: string) => {
      set({ ultiSelected: ulti });
      await saveItemInJson(
        StorageKeys.POO_CREATURE_STATS,
        "ultiSelected",
        ulti
      );
    };

    const resetData = async () => {
      await saveJson(
        StorageKeys.POO_CREATURE_STATS,
        DefaultValues.PooCreatureStats
      );
      set({ ...DefaultValues.PooCreatureStats });
    };

    const calculateAllStarsSpent = () => {
      const allStarsSpent =
        get()?.attaque -
        DefaultValues.PooCreatureStats.attaque +
        (get()?.defense - DefaultValues.PooCreatureStats.defense) +
        (get()?.pv - DefaultValues.PooCreatureStats.pv) / 5 +
        (get()?.mana - DefaultValues.PooCreatureStats.mana) / 5 +
        (get()?.resMana - DefaultValues.PooCreatureStats.resMana) +
        (get()?.recupMana - DefaultValues.PooCreatureStats.recupMana);
      return allStarsSpent;
    };

    return {
      ...DefaultValues.PooCreatureStats,
      incrStat,
      selectUlti,
      resetData,
      calculateAllStarsSpent,
    };
  }
);
