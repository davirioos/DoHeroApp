// src/screen/home/task/index.tsx
import { rankingIcons } from "@/src/assets/img/rankingIcons/rankingIcons";
import AddTaskModal from "@/src/components/AddTaskModal/AddTaskModal";
import FloatingActionButton from "@/src/components/FloatingActionButton/FloatingActionButton";
import Kanban from "@/src/components/kanban/Kanban";
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import { useTaskStore } from "@/src/stores/task/taskStore";
import React from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

const getFormattedDate = () => {
  const date = new Date();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const day = date.getDate();
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalizedMonth} ${day}`;
};

export default function TaskGamificado() {
  const { openModal } = useTaskStore();
  const { ranking, level } = usePlayerStore();

  const iconesDoRankingAtual = rankingIcons[ranking] || rankingIcons.Wood;
  const indiceDaImagem = level - 1;
  const iconeFinal =
    iconesDoRankingAtual[
      Math.min(indiceDaImagem, iconesDoRankingAtual.length - 1)
    ];

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.tituloText}>{getFormattedDate()}</Text>
        <Image
          source={iconeFinal}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.containerTask}>
        <Kanban />
      </View>

      <AddTaskModal />
      <FloatingActionButton onPress={() => openModal()} />
      <Toast />
    </View>
  );
}
