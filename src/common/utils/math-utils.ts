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
}
