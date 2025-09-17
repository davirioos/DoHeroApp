// src/stores/resetStores/storeReset.ts
import { useAchievementsStore } from "../achievementsStore/achievementsStore";
import { useBossStore } from "../bossStore/bossStore";
import { useHabitStore } from "../habit/habitStore";
import { usePlayerStore } from "../playerStore/playerStore";
import { useTaskStore } from "../task/taskStore";

/**
 * Reseta todos os stores para o estado inicial e limpa o armazenamento persistido.
 */
export const resetAllStores = async () => {
  // Limpa o armazenamento local de cada store
  await usePlayerStore.persist.clearStorage();
  await useHabitStore.persist.clearStorage();
  await useTaskStore.persist.clearStorage();
  await useBossStore.persist.clearStorage();
  await useAchievementsStore.persist.clearStorage();

  // Reseta o estado na memória
  usePlayerStore.getState().reset();
  useHabitStore.getState().reset();
  useTaskStore.getState().reset();
  useBossStore.getState().reset();
  useAchievementsStore.getState().reset();
};
