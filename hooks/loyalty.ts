import { create } from "zustand";
import axios from "axios";

type LoyaltyState = {
  points: number | null;
  loading: boolean;
  setPoints: (points: number) => void;
  fetchLoyalty: () => Promise<void>;
};

export const useLoyaltyStore = create<LoyaltyState>((set, get) => ({
  points: null,
  loading: false,

  setPoints: (points) => set({ points }),

  fetchLoyalty: async () => {
    const { points } = get();
    // ✅ Only fetch if not already available
    if (points !== null) return;

    try {
      set({ loading: true });
      const res = await axios.get("/api/loyalty");
      set({ points: res.data?.points ?? 0, loading: false });
    } catch (error: any) {
      console.error(
        "Error fetching loyalty points:",
        error?.response?.data || error.message
      );
      set({ loading: false });
    }
  },
}));
