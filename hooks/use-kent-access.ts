import { create } from "zustand";
import axios from "axios";

interface KentAccessStore {
  isExpired: boolean;
  accessEndTime: string | null;
  isLoading: boolean;
  fetchAccess: () => Promise<void>;
}

export const useKentAccessStore = create<KentAccessStore>((set) => ({
  isExpired: true,
  accessEndTime: null,
  isLoading: false,
  fetchAccess: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/kent-free-trial");
      set({
        isExpired: response.data.isExpired,
        accessEndTime: response.data.accessEndTime,
      });
    } catch (error) {
      console.error("Failed to fetch kent access:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
