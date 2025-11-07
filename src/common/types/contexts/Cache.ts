export type CacheItem = {
  value: any;
  availabilityDurationInSecond?: number;
  storingDate: Date;
};

export type CacheMap = { [key: string]: CacheItem };
