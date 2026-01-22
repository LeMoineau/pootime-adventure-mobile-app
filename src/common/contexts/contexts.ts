import { createContext } from "react";
import { CacheMap } from "../../types/contexts/Cache";

export const CacheContext = createContext({
  cache: {} as CacheMap,
  put: (key: string, value: any, availabilityDurationInSecond?: number) => {},
  get: (key: string): any | undefined => {},
  remove: (key: string) => {},
});
