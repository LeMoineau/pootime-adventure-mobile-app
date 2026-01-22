import { MathUtils } from "./math-utils";

export namespace ArrayUtils {
  export function pushAndReturn<T>(array: T[], item: T): T[] {
    array.push(item);
    return array;
  }

  export function findAndCall<T>(
    array: T[],
    condition: (i: T) => boolean,
    onFound: (i: T) => void,
    onFailed: (arr: T[]) => void
  ): T[] {
    const target = array.find(condition);
    if (!target) {
      onFailed(array);
    } else {
      onFound(target);
    }
    return array;
  }

  export function createArray(length: number): number[] {
    return Array.from({ length: length }, (_, index) => index);
  }

  export function getRandomItem<T>(arr: T[]): T {
    const index = MathUtils.getRandomInt(arr.length);
    return arr[index];
  }
}
