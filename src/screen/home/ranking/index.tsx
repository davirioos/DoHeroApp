// src/screen/home/ranking/index.tsx
import { rankingIcons } from "@/src/assets/img/rankingIcons/rankingIcons";
import { useHabitStore } from "@/src/stores/habit/habitStore";
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { Animated, Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

const XP_PER_LEVEL = 5000;

const toRoman = (num: number) => {
  const roman: { [key: number]: string } = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
  };
  return roman[num] || num;
};

const daysBetween = (date1: Date, date2: Date) => {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((date2.getTime() - date1.getTime()) / oneDay) + 1;
};

export default function RankingGamificado() {
  const { level, ranking, highestRanking, highestLevel, xp } = usePlayerStore();
  const { habits } = useHabitStore();
  const progressAnim = useRef(new Animated.Value(0)).current;

  const habitosConcluidosGeral = habits.reduce(
    (count, habit) => count + habit.diasCompletos.length,
    0
  );
  const primeiraDataRegistrada = habits.reduce(
    (earliest: Date | null, habit) => {
      if (habit.diasCompletos.length === 0) return earliest;
      const earliestInHabit = new Date([...habit.diasCompletos].sort()[0]);
      return !earliest || earliestInHabit < earliest
        ? earliestInHabit
        : earliest;
    },
    null
  );

  let taxaDeSucessoGeral = 0;
  if (primeiraDataRegistrada && habits.length > 0) {
    const totalDiasDesdeInicio = daysBetween(
      primeiraDataRegistrada,
      new Date()
    );
    const totalPossivelGeral = habits.length * totalDiasDesdeInicio;
    taxaDeSucessoGeral =
      totalPossivelGeral > 0
        ? Math.round((habitosConcluidosGeral / totalPossivelGeral) * 100)
        : 0;
  }

  const iconeAtual = rankingIcons[ranking]?.[level - 1] || rankingIcons.Wood[0];
  const iconeMaisAlto =
    rankingIcons[highestRanking]?.[highestLevel - 1] || rankingIcons.Wood[0];

  const AnimatedProgressBar = Animated.createAnimatedComponent(Progress.Bar);

  return (
    <LinearGradient
      colors={["#6DD5ED", "#2193B0", "#1a9c8b", "#34e89e", "#00FF80"]}
      locations={[0.1, 0.3, 0.5, 0.7, 0.9]}
      start={[0.1, 0.1]}
      end={[0.9, 0.9]}
      style={styles.container}
    >
      <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
        <View style={styles.cardsContainer}>
          <BlurView intensity={50} tint="light" style={styles.glassCard}>
            <Text style={styles.cardTitle}>Ranking mais alto</Text>
            <Image source={iconeMaisAlto} style={styles.cardIcon} />
            <Text style={styles.cardRankName}>
              {highestRanking} {toRoman(highestLevel)}
            </Text>
          </BlurView>

          <BlurView intensity={50} tint="light" style={styles.glassCard}>
            <Text style={styles.cardTitle}>Taxa de sucesso</Text>
            <Text style={styles.successRate}>{taxaDeSucessoGeral}%</Text>
          </BlurView>
        </View>

        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>
            {xp} / {XP_PER_LEVEL} XP
          </Text>
          <AnimatedProgressBar
            progress={progressAnim}
            width={300}
            height={12}
            color="#FFD700"
            unfilledColor="rgba(255, 255, 255, 0.2)"
            borderColor="transparent"
            borderRadius={8}
          />
        </View>

        <Image
          source={iconeAtual}
          style={styles.mainIcon}
          resizeMode="contain"
        />

        <Text style={styles.rankTitle}>
          {ranking} {toRoman(level)}
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
