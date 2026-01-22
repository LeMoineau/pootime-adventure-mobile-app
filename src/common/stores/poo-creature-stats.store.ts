import { create } from "zustand";
import useStorage from "../../hooks/use-storage";
import { StorageKeys } from "../../config/StorageKeys";
import { DefaultValues } from "../../config/DefaultValues";
import { StatType } from "../../types/StatType";
import { MathUtils } from "../../utils/math-utils";
import { ObjectUtils } from "../../utils/object-utils";
import { DataInStorage } from "../../types/dataInStorage";
import { CurveUtils } from "../../utils/curve-utils";
import { PooCreatureStats } from "../../types/PooCreatureStats";

export type PooCreatureStatsStore = {
  incrStat: (stat: StatType, val?: number) => Promise<void>;
  toggleUlti: (ulti: string) => Promise<void>;
  resetData: () => Promise<void>;
  calculateAllStarsSpent: () => number;
  getStat: (stat: keyof PooCreatureStats) => any;
  resetStat: (stat: keyof PooCreatureStats) => any;
  loadData: (data: DataInStorage.PooCreatureStats) => Promise<void>;
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

    const incrStat = async (stat: StatType, val: number = 1) => {
      let mult = 1;
      if (stat === "pv" || stat === "mana") mult = 5;
      set((state) => ({ [stat]: state[stat] - -val * mult }));
      await saveItemInJson(StorageKeys.POO_CREATURE_STATS, stat, get()[stat]);
      await _incrExp(val);
    };

    const _incrExp = async (val: number = 1) => {
      let currentExp = get().currentExp + val;
      if (currentExp >= CurveUtils.calculateExpNeedForNextLevel(get().level)) {
        set((state) => ({ level: state.level + 1, currentExp: 0 }));
      } else {
        set({ currentExp: currentExp });
      }
      await saveItemInJson(
        StorageKeys.POO_CREATURE_STATS,
        "level",
        get().level,
      );
      await saveItemInJson(
        StorageKeys.POO_CREATURE_STATS,
        "currentExp",
        get().currentExp,
      );
    };

    const toggleUlti = async (ulti: string) => {
      const ultiSelected = get().ultiSelected === ulti ? "" : ulti;
      set({ ultiSelected });
      await saveItemInJson(
        StorageKeys.POO_CREATURE_STATS,
        "ultiSelected",
        ultiSelected,
      );
    };

    const resetData = async () => {
      await saveJson(
        StorageKeys.POO_CREATURE_STATS,
        DefaultValues.PooCreatureStats,
      );
      set({ ...DefaultValues.PooCreatureStats });
    };

    const loadData = async (data: DataInStorage.PooCreatureStats) => {
      await saveJson(StorageKeys.POO_CREATURE_STATS, data);
      set({ ...data });
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

    const getStat = (stat: keyof PooCreatureStats) => {
      return get()[stat];
    };

    const resetStat = async (stat: keyof PooCreatureStats) => {
      set({ [stat]: DefaultValues.PooCreatureStats[stat] });
      await saveItemInJson(
        StorageKeys.POO_CREATURE_STATS,
        stat,
        `${DefaultValues.PooCreatureStats[stat]}`,
      );
    };

    return {
      ...DefaultValues.PooCreatureStats,
      incrStat,
      toggleUlti,
      resetData,
      calculateAllStarsSpent,
      getStat,
      loadData,
      resetStat,
    };
  },
);
