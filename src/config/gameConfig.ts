// src/config/gameConfig.ts
import { RankingName } from "../assets/img/rankingIcons/rankingIcons";

// Uma lista ordenada que define a progressão dos rankings
export const RANKING_ORDER: RankingName[] = [
  "Wood",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Amethyst",
  "Ruby",
  "Sapphire",
  "Onyx",
  "Master",
];

// O nível máximo dentro de um ranking antes de progredir para o próximo
export const MAX_LEVEL_PER_RANK = 12;

// --- ADICIONE O CÓDIGO ABAIXO ---

export const TASK_REWARDS = {
  C: { xp: 50, gold: 10 },
  B: { xp: 100, gold: 25 },
  A: { xp: 200, gold: 50 },
  "A+": { xp: 350, gold: 90 },
  SS: { xp: 500, gold: 150 },
};

// Exporta o tipo 'TaskClass'
export type TaskClass = keyof typeof TASK_REWARDS;

// Exporta a constante 'CLASS_OPTIONS'
export const CLASS_OPTIONS: TaskClass[] = ["C", "B", "A", "A+", "SS"];
