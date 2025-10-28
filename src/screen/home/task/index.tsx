import { rankingIcons } from "@/src/assets/img/rankingIcons/rankingIcons";
import AddTaskModal from "@/src/components/AddTaskModal/AddTaskModal";
import FloatingActionButton from "@/src/components/FloatingActionButton/FloatingActionButton";
import Kanban from "@/src/components/kanban/Kanban";
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import { useTaskStore } from "@/src/stores/task/taskStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import React from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

const getFormattedDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat([], options).format(date);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default function TaskGamificado() {
  const { openModal } = useTaskStore();
  const { ranking, level } = usePlayerStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const iconesDoRankingAtual = rankingIcons[ranking] || rankingIcons.Wood;
  const indiceDaImagem = level - 1;
  const iconeFinal =
    iconesDoRankingAtual[
      Math.min(indiceDaImagem, iconesDoRankingAtual.length - 1)
    ];

  return (
    <View style={[styles.container, isDark && darkTheme.tasks.container]}>
      <View style={styles.background}>
        <Text style={styles.tituloText}>{getFormattedDate()}</Text>
        <Image
          source={iconeFinal}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View
        style={[styles.containerTask, isDark && darkTheme.tasks.containerTask]}
      >
        <Kanban />
      </View>

      <AddTaskModal />
      <FloatingActionButton onPress={() => openModal()} />
      <Toast />
    </View>
  );
}
