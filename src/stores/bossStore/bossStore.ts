// src/stores/bossStore/bossStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
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

          // --- LÓGICA DE RECOMPENSA APLICADA AQUI ---
          if (state.hp >= state.maxHp && !state.isDefeated) {
            state.isDefeated = true;
            usePlayerStore.getState().addGold(1000);
            usePlayerStore.getState().addXp(500); // Adiciona o XP bônus
            Toast.show({
              type: "success",
              text1: "Chefe Derrotado!",
              text2: "Você ganhou 1000 de Ouro e 500 XP bônus!",
            });
          }
        });
      },

      checkEndOfChallenge: () => {
        const { endDate, isDefeated, hp, maxHp } = get();
        if (!endDate || new Date() < new Date(endDate)) {
          return;
        }

        // --- LÓGICA DE PENALIDADE APLICADA AQUI ---
        if (!isDefeated) {
          const remainingHp = maxHp - hp;
          const penalty = Math.round(remainingHp * 0.5);

          if (penalty > 0) {
            usePlayerStore.getState().removeXp(penalty);
            Toast.show({
              type: "error",
              text1: "Desafio do Chefe Falhou!",
              text2: `Você não derrotou o chefe e perdeu ${penalty} XP.`,
            });
          }
        }
        // Reseta para a próxima semana, independentemente do resultado
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
