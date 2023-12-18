import { create } from "zustand";

type Store = {
  stars: number;
  pooCoins: number;
  earnStar: (val: number) => void;
  earnPooCoin: (val: number) => void;
  spendStar: (val: number) => void;
  spendPooCoin: (val: number) => void;
};

export const useResourcesStore = create<Store>((set) => {
  return {
    stars: 0,
    pooCoins: 0,
    earnStar: (val: number) => set((state) => ({ stars: state.stars + val })),
    earnPooCoin: (val: number) =>
      set((state) => ({ pooCoins: state.pooCoins + val })),
    spendStar: (val: number) => set((state) => ({ stars: state.stars - val })),
    spendPooCoin: (val: number) =>
      set((state) => ({ pooCoins: state.pooCoins - val })),
  };
});
