// src/screen/home/boss/index.tsx
import { useBossStore } from "@/src/stores/bossStore/bossStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function BossGamificado() {
  const { hp, maxHp, endDate, checkEndOfChallenge, startNewWeek, isDefeated } =
    useBossStore();

  const progresso = maxHp > 0 ? hp / maxHp : 0;

  let diasRestantes = 0;
  if (endDate) {
    const diffTime = new Date(endDate).getTime() - new Date().getTime();
    diasRestantes = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.containerHeader}>
          <Text style={styles.tituloText}>Chefe Semanal</Text>
        </View>

        <View style={styles.containerProgress}>
          <Text style={styles.subText}>
            {diasRestantes > 0
              ? `Faltam ${diasRestantes} Dias`
              : "Desafio Terminado"}
          </Text>
          <Progress.Bar
            progress={progresso}
            width={250}
            height={12}
            color={isDefeated ? "#2ECC71" : "#D9534F"}
          />
          <Text style={[styles.subText, { marginTop: 5 }]}>
            {hp} / {maxHp} de Dano
          </Text>
        </View>

        <Image
          source={require("../../../assets/img/returnCoffeeMarronzinho.png")}
          style={styles.image}
        />

        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsTitle}>Recompensas pela Vitória</Text>
          <View style={styles.rewardsRow}>
            <View style={styles.rewardItem}>
              <Ionicons name="logo-bitcoin" size={24} color="#FFD700" />
              <Text style={styles.rewardText}>1000 Ouro</Text>
            </View>
            <View style={styles.rewardItem}>
              <Ionicons name="star" size={24} color="#3498db" />
              <Text style={styles.rewardText}>500 XP Bônus</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
