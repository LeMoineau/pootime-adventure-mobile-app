import { createContext } from "react";

export const CacheContext = createContext({
  put: (key: string, value: any, availabilityDurationInSecond?: number) => {},
  get: (key: string): any | undefined => {},
  remove: (key: string) => {},
});
