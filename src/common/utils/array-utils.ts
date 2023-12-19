export namespace ArrayUtils {
  export function pushAndReturn<T>(array: T[], item: T): T[] {
    array.push(item);
    return array;
  }
}
