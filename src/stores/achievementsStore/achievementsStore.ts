// src/stores/achievementsStore/achievementsStore.ts
import {
  AchievementId,
  achievementsList,
} from "@/src/config/achievementsConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useHabitStore } from "../habit/habitStore";
import { usePlayerStore } from "../playerStore/playerStore";
import { useTaskStore } from "../task/taskStore";

interface AchievementsState {
  unlockedAchievements: AchievementId[];
  unlockAchievement: (achievementId: AchievementId) => void;
  checkAventureiro: () => void;
  checkNivelMestreSabio: () => void;
  reset: () => void;
}

const initialState = {
  unlockedAchievements: [],
};

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      unlockAchievement: (achievementId) => {
        set((state) => {
          if (!state.unlockedAchievements.includes(achievementId)) {
            state.unlockedAchievements.push(achievementId);
            const achievement = achievementsList.find(
              (a) => a.id === achievementId
            );
            Toast.show({
              type: "success",
              text1: "Conquista Desbloqueada!",
              text2: `Você ganhou o título: ${achievement?.name || ""}`,
            });
            usePlayerStore.getState().addTitle(achievementId);
          }
        });
      },

      checkAventureiro: () => {
        const completedTasks = useTaskStore
          .getState()
          .tasks.filter((t) => t.status === "completed").length;
        const completedHabits = useHabitStore
          .getState()
          .habits.reduce((acc, h) => acc + h.diasCompletos.length, 0);
        if (completedTasks + completedHabits >= 3) {
          get().unlockAchievement("aventureiro");
        }
      },

      checkNivelMestreSabio: () => {
        if (usePlayerStore.getState().ranking === "Platinum") {
          get().unlockAchievement("nivelMestreSabio");
        }
      },

      reset: () => set(initialState),
    })),
    {
      name: "achievements-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
