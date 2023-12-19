import { StatType } from "../types/Stats";

export namespace MathUtils {
  export function calculateGainStat(
    stat: StatType,
    currentValue: number
  ): number {
    if (stat === "pv") {
      return 5;
    }
    return 1;
  }

  export function calculateExpNeedForNextLevel(currentLevel: number): number {
    return Math.round(1.5 + currentLevel * 1.2);
  }
}
