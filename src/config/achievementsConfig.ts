// src/config/achievementsConfig.ts

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any; // Usaremos require() para as imagens
  unlockedIcon: any;
}

export const achievementsList: Achievement[] = [
  {
    id: "vanguarda",
    name: "Vanguarda",
    description: "Concedido a membros especiais da equipe.",
    icon: require("@/src/assets/img/achievements/vanguardaNo.png"),
    unlockedIcon: require("@/src/assets/img/achievements/vanguarda.png"),
  },
  {
    id: "reiDasTarefas",
    name: "Rei das Tarefas",
    description: "Complete todas as tarefas por 7 dias seguidos.",
    icon: require("@/src/assets/img/achievements/ReiDasTarefasNo.png"),
    unlockedIcon: require("@/src/assets/img/achievements/ReiDasTarefas.png"),
  },
  {
    id: "oBravo",
    name: "O Bravo",
    description: "Complete todos os hábitos por 7 dias seguidos.",
    icon: require("@/src/assets/img/achievements/OBravoNo.png"),
    unlockedIcon: require("@/src/assets/img/achievements/OBravo.png"),
  },
  {
    id: "oConquistador",
    name: "O Conquistador",
    description: "Mantenha uma sequência de 30 dias em todos os hábitos.",
    icon: require("@/src/assets/img/achievements/OconquistadorNo.png"),
    unlockedIcon: require("@/src/assets/img/achievements/Oconquistador.png"),
  },
  {
    id: "aOrigem",
    name: "A Origem",
    description: "Para os primeiros aventureiros a testarem o app.",
    icon: require("@/src/assets/img/achievements/AorigemNo.png"),
    unlockedIcon: require("@/src/assets/img/achievements/Aorigem.png"),
  },
  {
    id: "aventureiro",
    name: "Aventureiro",
    description: "Conclua suas 3 primeiras tarefas ou hábitos.",
    icon: require("@/src/assets/img/achievements/AventureiroNo.png"),
    unlockedIcon: require("@/src/assets/img/achievements/Aventureiro.png"),
  },
  {
    id: "nivelMestreSabio",
    name: "Nível Mestre Sábio",
    description: "Alcançe o ranking Platina.",
    icon: require("@/src/assets/img/achievements/NivelMestreSabioNo.png"),
    unlockedIcon: require("@/src/assets/img/achievements/NivelMestreSabio.png"),
  },
];

export type AchievementId = (typeof achievementsList)[number]["id"];
