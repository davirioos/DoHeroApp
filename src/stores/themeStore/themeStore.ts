// src/stores/themeStore/themeStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    immer((set) => ({
      theme: "light", // Tema padrão
      toggleTheme: () => {
        set((state) => {
          state.theme = state.theme === "light" ? "dark" : "light";
        });
      },
      setTheme: (theme) => {
        set((state) => {
          state.theme = theme;
        });
      },
    })),
    {
      name: "theme-storage", // Nome para o armazenamento local
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
