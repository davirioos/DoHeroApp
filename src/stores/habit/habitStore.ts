// src/stores/habit/habitStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useAchievementsStore } from "../achievementsStore/achievementsStore";
import { useBossStore } from "../bossStore/bossStore";
import { usePlayerStore } from "../playerStore/playerStore";

export interface Habit {
  id: string;
  nome: string;
  icon: string;
  xp: number;
  gold: number;
  diasCompletos: string[];
  difficulty: number;
}
type HabitInput = Omit<Habit, "id" | "diasCompletos" | "xp" | "gold"> & {
  difficulty: number;
};
type HabitEditInput = Partial<
  Omit<Habit, "id" | "diasCompletos" | "xp" | "gold"> & { difficulty: number }
>;
interface HabitState {
  habits: Habit[];
  streak: number;
  bestStreak: number;
  lastStreakUpdate: string | null;
  isModalVisible: boolean;
  isEditModalVisible: boolean;
  habitToEdit: Habit | null;
  lastCompletionCheck: string | null;
  addHabit: (newHabitData: HabitInput) => void;
  editHabit: (habitId: string, updatedData: HabitEditInput) => void;
  deleteHabit: (habitId: string) => void;
  toggleEditModal: (habit?: Habit | null) => void;
  toggleModal: () => void;
  completeHabit: (id: string, date: Date) => void;
  checkAndUpdateStreak: () => void;
  checkDailyHabitCompletion: () => void;
  reset: () => void;
}

const formatDateToYyyyMmDd = (date: Date) => date.toISOString().split("T")[0];
const getRewardsFromDifficulty = (difficulty: number) => ({
  xp: difficulty * 20,
  gold: difficulty * 5,
});

const initialState = {
  habits: [],
  streak: 0,
  bestStreak: 0,
  lastStreakUpdate: null,
  isModalVisible: false,
  isEditModalVisible: false,
  habitToEdit: null,
  lastCompletionCheck: null,
};

export const useHabitStore = create<HabitState>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      addHabit: (newHabitData) => {
        set((state) => {
          const { xp, gold } = getRewardsFromDifficulty(
            newHabitData.difficulty
          );
          const newHabit: Habit = {
            ...newHabitData,
            id: new Date().toISOString(),
            diasCompletos: [],
            xp,
            gold,
          };
          state.habits.push(newHabit);
          Toast.show({ type: "success", text1: "Hábito criado!" });
        });
        get().checkAndUpdateStreak();
      },

      editHabit: (habitId, updatedData) => {
        set((state) => {
          const habit = state.habits.find((h) => h.id === habitId);
          if (habit) {
            Object.assign(habit, updatedData);
            if (updatedData.difficulty) {
              const { xp, gold } = getRewardsFromDifficulty(
                updatedData.difficulty
              );
              habit.xp = xp;
              habit.gold = gold;
            }
          }
        });
      },

      deleteHabit: (habitId) => {
        set((state) => {
          state.habits = state.habits.filter((h) => h.id !== habitId);
        });
      },

      toggleEditModal: (habit = null) =>
        set((state) => {
          state.isEditModalVisible = !state.isEditModalVisible;
          state.habitToEdit = habit;
        }),

      toggleModal: () =>
        set((state) => {
          state.isModalVisible = !state.isModalVisible;
        }),

      completeHabit: (id, date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const clickedDate = new Date(date);
        clickedDate.setHours(0, 0, 0, 0);

        if (clickedDate.getTime() > today.getTime()) return;

        set((state) => {
          const habit = state.habits.find((h) => h.id === id);
          if (!habit) return;

          const formattedDate = formatDateToYyyyMmDd(date);
          const alreadyCompleted = habit.diasCompletos.includes(formattedDate);

          if (alreadyCompleted) {
            habit.diasCompletos = habit.diasCompletos.filter(
              (d) => d !== formattedDate
            );
            usePlayerStore.getState().removeXp(habit.xp);
            usePlayerStore.getState().removeGold(habit.gold);
          } else {
            habit.diasCompletos.push(formattedDate);
            usePlayerStore.getState().addXp(habit.xp);
            useBossStore.getState().dealDamage(habit.xp);
            usePlayerStore.getState().addGold(habit.gold);
          }
        });

        get().checkAndUpdateStreak();
        useAchievementsStore.getState().checkAventureiro();
      },

      checkAndUpdateStreak: () => {
        set((state) => {
          const todayStr = formatDateToYyyyMmDd(new Date());
          if (state.lastStreakUpdate === todayStr || state.habits.length === 0)
            return;

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = formatDateToYyyyMmDd(yesterday);

          const allHabitsDoneToday = state.habits.every((h) =>
            h.diasCompletos.includes(todayStr)
          );

          if (allHabitsDoneToday) {
            state.streak =
              state.lastStreakUpdate === yesterdayStr ? state.streak + 1 : 1;
            state.lastStreakUpdate = todayStr;
          } else {
            const anyHabitDoneYesterday = state.habits.some((h) =>
              h.diasCompletos.includes(yesterdayStr)
            );
            if (!anyHabitDoneYesterday && state.lastStreakUpdate !== todayStr) {
              state.streak = 0;
            }
          }
          state.bestStreak = Math.max(state.streak, state.bestStreak);
        });

        const { streak } = get();
        if (streak >= 7)
          useAchievementsStore.getState().unlockAchievement("oBravo");
        if (streak >= 30)
          useAchievementsStore.getState().unlockAchievement("oConquistador");
      },

      checkDailyHabitCompletion: () => {
        const todayStr = formatDateToYyyyMmDd(new Date());
        const lastCheck = get().lastCompletionCheck;
        if (lastCheck === todayStr) return;

        // --- LÓGICA DE PENALIDADE REMOVIDA DAQUI ---
        // A perda do "streak" é a consequência principal,
        // gerenciada pela função checkAndUpdateStreak.

        set({ lastCompletionCheck: todayStr });
      },

      reset: () => set(initialState),
    })),
    {
      name: "habit-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
