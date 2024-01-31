import { StatType } from "../types/StatType";
import { DefaultValues } from "../config/DefaultValues";

export namespace MathUtils {
  export function calculateGainStat(
    stat: StatType,
    currentValue: number
  ): number {
    if (stat === "pv" || stat === "mana") {
      return 5;
    }
    return 1;
  }

  export function getRandomInt(max: number, min?: number) {
    return (min ?? 0) + Math.floor(Math.random() * (min ? max - min + 1 : max));
  }

  export function convertToReduceStrFormat(val: number): string {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    }
    return `${val.toFixed(0)}`;
  }
}
