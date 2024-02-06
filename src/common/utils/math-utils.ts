import { StatType } from "../types/StatType";

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

  export function divideToMaxFixed(
    val: number,
    divider: number,
    maxFixed: number
  ): string {
    return (val / divider).toFixed(val % divider === 0 ? 0 : maxFixed);
  }

  export function convertToReduceStrFormat(val: number): string {
    if (val >= 1000) {
      return `${divideToMaxFixed(val, 1000, 1)}K`;
    }
    if (val >= 1000000) {
      return `${divideToMaxFixed(val, 1000000, 1)}M`;
    }
    return `${val.toFixed(0)}`;
  }
}
