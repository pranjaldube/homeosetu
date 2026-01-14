import { create } from "zustand";

type CartStore = {
  kentAccess: boolean;
  setKentAccess: (access: boolean) => void;
};

export const useKentAccessStore = create<CartStore>((set) => ({
  kentAccess: false, // initial state
  setKentAccess: (access: boolean) => set({ kentAccess: access }),
}));
