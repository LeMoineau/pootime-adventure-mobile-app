import { ReactNode, useRef } from "react";
import { CacheMap } from "../types/contexts/Cache";
import { DefaultValues } from "../config/DefaultValues";
import { CacheContext } from "./contexts";

export default function CacheProvider({ children }: { children: ReactNode }) {
  const cache = useRef<CacheMap>({});

  const put = (
    key: string,
    value: any,
    availabilityDurationInSecond?: number
  ) => {
    cache.current[key] = {
      value,
      availabilityDurationInSecond,
      storingDate: new Date(),
    };
    console.log(`#${key} put in cache`);
  };

  /**
   * Get the cached value by key if exist and if not expired
   * @param key
   * @returns cached value or undefined
   */
  const get = (key: string) => {
    const target = cache.current[key];
    if (
      target !== undefined &&
      (new Date().getTime() - target.storingDate.getTime()) / 1000 <=
        (target.availabilityDurationInSecond ??
          DefaultValues.CACHE_AVAILABILITY_DURATION_IN_SECOND)
    ) {
      console.log(`#${key} get from cache`);
      return target.value;
    }
    return undefined;
  };

  const remove = (key: string) => {
    delete cache.current[key];
  };

  return (
    <CacheContext.Provider
      value={{
        cache: cache.current,
        put,
        get,
        remove,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
}
