import { create } from "zustand";

interface Store {
  blurEnabled: boolean;
  enableBlur: () => void;
  disableBlur: () => void;
}

export const useBlurStore = create<Store>((set, _) => {
  return {
    blurEnabled: false,
    enableBlur: () => set({ blurEnabled: true }),
    disableBlur: () => set({ blurEnabled: false }),
  };
});
