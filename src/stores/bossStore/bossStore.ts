// src/stores/bossStore/bossStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { usePlayerStore } from "../playerStore/playerStore";

interface BossState {
  hp: number;
  maxHp: number;
  endDate: string | null;
  isDefeated: boolean;
  startNewWeek: () => void;
  dealDamage: (amount: number) => void;
  checkEndOfChallenge: () => void;
  reset: () => void;
}

const getNextSaturday = () => {
  const date = new Date();
  date.setDate(date.getDate() + ((6 - date.getDay() + 7) % 7));
  date.setHours(23, 59, 59, 999);
  return date;
};

const initialState = {
  hp: 0,
  maxHp: 5000,
  endDate: null,
  isDefeated: false,
};

export const useBossStore = create<BossState>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      startNewWeek: () => {
        set((state) => {
          state.endDate = getNextSaturday().toISOString();
          state.hp = 0;
          state.isDefeated = false;
          state.maxHp = 5000;
        });
      },

      dealDamage: (amount) => {
        set((state) => {
          if (state.isDefeated) return;
          state.hp = Math.min(state.maxHp, state.hp + amount);
          if (state.hp >= state.maxHp) {
            state.isDefeated = true;
            usePlayerStore.getState().addGold(1000);
          }
        });
      },

      checkEndOfChallenge: () => {
        const { endDate, isDefeated, hp, maxHp } = get();
        if (!endDate || new Date() < new Date(endDate)) {
          return;
        }

        if (!isDefeated) {
          const penalty = Math.round((maxHp - hp) * 0.5);
          usePlayerStore.getState().removeXp(penalty);
        }
        get().startNewWeek();
      },

      reset: () => set(initialState),
    })),
    {
      name: "boss-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
