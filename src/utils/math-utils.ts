import { NumberProp } from "react-native-svg";
import { CustomSvgProps } from "../types/CustomSvgProps";

export namespace MathUtils {
  export function getRandomInt(max: number, min?: number) {
    return (min ?? 0) + Math.floor(Math.random() * (min ? max - min + 1 : max));
  }

  export function divideToMaxFixed(
    val: number,
    divider: number,
    maxFixed: number,
  ): number {
    return (
      Math.floor((val / divider) * Math.pow(10, maxFixed)) /
      Math.pow(10, maxFixed)
    );
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
