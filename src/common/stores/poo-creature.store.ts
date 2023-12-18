import { create } from "zustand";

type Store = {
  count: number;
  inc: () => void;
};

const usePooCreatureStore = create<Store>((set, get) => {
  return {
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
  };
});
