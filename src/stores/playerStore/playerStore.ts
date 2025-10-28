// src/stores/playerStore/playerStore.ts
import { RankingName } from "@/src/assets/img/rankingIcons/rankingIcons";
import { AchievementId } from "@/src/config/achievementsConfig";
import { MAX_LEVEL_PER_RANK, RANKING_ORDER } from "@/src/config/gameConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface PlayerState {
  name: string;
  xp: number;
  level: number;
  ranking: RankingName;
  gold: number;
  highestRanking: RankingName;
  highestLevel: number;
  titles: AchievementId[];
  currentTitle: AchievementId | null;
  isInitialized: boolean;
  _hasHydrated: boolean;
  setName: (name: string) => void;
  addXp: (amount: number) => void;
  addGold: (amount: number) => void;
  removeXp: (amount: number) => void;
  removeGold: (amount: number) => void;
  addTitle: (title: AchievementId) => void;
  setCurrentTitle: (title: AchievementId) => void;
  setHasHydrated: (state: boolean) => void;
  reset: () => void;
}

const XP_PER_LEVEL = 5000;

const initialState = {
  name: "",
  xp: 0,
  level: 1,
  ranking: "Wood" as RankingName,
  gold: 0,
  highestRanking: "Wood" as RankingName,
  highestLevel: 1,
  titles: [],
  currentTitle: null,
  isInitialized: false,
  _hasHydrated: false,
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    immer((set) => ({
      ...initialState,

      setName: (name) => {
        set((state) => {
          state.name = name;
          state.isInitialized = true;
        });
      },

      addXp: (amount: number) => {
        set((state) => {
          state.xp += amount;
          while (state.xp >= XP_PER_LEVEL) {
            if (state.level < MAX_LEVEL_PER_RANK) {
              state.xp -= XP_PER_LEVEL;
              state.level += 1;
            } else {
              const currentRankIndex = RANKING_ORDER.indexOf(state.ranking);
              if (currentRankIndex < RANKING_ORDER.length - 1) {
                state.xp -= XP_PER_LEVEL;
                state.level = 1;
                state.ranking = RANKING_ORDER[currentRankIndex + 1];
              } else {
                state.xp = XP_PER_LEVEL;
                break;
              }
            }
          }
          const currentRankIndex = RANKING_ORDER.indexOf(state.ranking);
          const highestRankIndex = RANKING_ORDER.indexOf(state.highestRanking);
          if (currentRankIndex > highestRankIndex) {
            state.highestRanking = state.ranking;
            state.highestLevel = state.level;
          } else if (
            currentRankIndex === highestRankIndex &&
            state.level > state.highestLevel
          ) {
            state.highestLevel = state.level;
          }
        });
      },

      removeXp: (amount) => {
        set((state) => {
          state.xp -= amount;
          while (state.xp < 0) {
            if (state.level > 1) {
              state.level -= 1;
              state.xp += XP_PER_LEVEL;
            } else {
              const currentRankIndex = RANKING_ORDER.indexOf(state.ranking);
              if (currentRankIndex > 0) {
                const prevRank = RANKING_ORDER[currentRankIndex - 1];
                state.ranking = prevRank;
                state.level = MAX_LEVEL_PER_RANK;
                state.xp += XP_PER_LEVEL;
              } else {
                state.xp = 0;
                break;
              }
            }
          }
        });
      },

      addGold: (amount) => {
        set((state) => {
          state.gold += amount;
        });
      },

      removeGold: (amount) => {
        set((state) => {
          state.gold = Math.max(0, state.gold - amount);
        });
      },

      addTitle: (title) => {
        set((state) => {
          if (!state.titles.includes(title)) {
            state.titles.push(title);
            if (!state.currentTitle) {
              state.currentTitle = title;
            }
          }
        });
      },

      setCurrentTitle: (title) => {
        set((state) => {
          if (state.titles.includes(title)) {
            state.currentTitle = title;
          }
        });
      },

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },

      reset: () => set(initialState),
    })),
    {
      name: "player-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
