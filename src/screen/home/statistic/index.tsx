// src/screen/home/statistic/index.tsx
import {
  AchievementId,
  achievementsList,
} from "@/src/config/achievementsConfig";
import { useAchievementsStore } from "@/src/stores/achievementsStore/achievementsStore";
import { useHabitStore } from "@/src/stores/habit/habitStore";
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import { resetAllStores } from "@/src/stores/resetStores/storeReset";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export default function StatisticGamificado() {
  const { streak, bestStreak } = useHabitStore();
  const { currentTitle, setCurrentTitle, name } = usePlayerStore();
  const { unlockedAchievements } = useAchievementsStore();
  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await auth().signOut();
            resetAllStores();
            router.replace("/login");
          } catch (error) {
            console.error("Erro ao fazer logout:", error);
            Toast.show({
              type: "error",
              text1: "Erro",
              text2: "Não foi possível sair. Tente novamente.",
            });
          }
        },
      },
    ]);
  };

  const handleTitleChange = (titleId: AchievementId) => {
    setCurrentTitle(titleId);
    Toast.show({
      type: "info",
      text1: "Título Alterado!",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("@/src/assets/img/teste.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{name || "Aventureiro"}</Text>
          <Text style={styles.profileTitle}>
            {currentTitle
              ? achievementsList.find((a) => a.id === currentTitle)?.name
              : "Novato"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sequência de hábitos</Text>
          <View style={styles.habitStreakContainer}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Ionicons
                key={index}
                name="flame"
                size={moderateScale(24)}
                color={index < streak ? "#FFC107" : "#E0E0E0"}
              />
            ))}
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {String(streak).padStart(2, "0")}
            </Text>
            <Text style={styles.statLabel}>Sequência Atual</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {String(bestStreak).padStart(2, "0")}
            </Text>
            <Text style={styles.statLabel}>Melhor Sequência</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsGrid}>
              {achievementsList.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                return (
                  <TouchableOpacity
                    key={ach.id}
                    style={styles.achievementItem}
                    onPress={() => isUnlocked && handleTitleChange(ach.id)}
                    disabled={!isUnlocked}
                  >
                    <Image
                      source={isUnlocked ? ach.unlockedIcon : ach.icon}
                      style={[
                        styles.achievementIcon,
                        !isUnlocked && { opacity: 0.5 },
                      ]}
                    />
                    <Text
                      style={[
                        styles.achievementName,
                        !isUnlocked && { color: "#999" },
                      ]}
                    >
                      {ach.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={handleLogout}>
          <Text style={{ color: "#E74C3C", fontSize: RFValue(16) }}>
            Sair da conta
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
