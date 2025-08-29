import { create } from "zustand";
import { persist } from "zustand/middleware";

type Course = {
  id: string;
  title: string;
  price: number;
  dollar: number;
};

type CartStore = {
  items: Course[];
  setItems: (updater: (prev: Course[]) => Course[]) => void;
  clearCart: () => void
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      setItems: (updater) =>
        set((state) => ({
          items: updater(state.items),
        })),
      
        clearCart: () => set({items:[]})
    }),
    {
      name: "cart-storage", // stored in localStorage
    }
  )
);
