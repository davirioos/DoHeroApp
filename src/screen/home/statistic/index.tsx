import {
  AchievementId,
  achievementsList,
} from "@/src/config/achievementsConfig";
import { useAchievementsStore } from "@/src/stores/achievementsStore/achievementsStore";
import { useHabitStore } from "@/src/stores/habit/habitStore";
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export default function StatisticGamificado() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const { streak, bestStreak } = useHabitStore();
  const { currentTitle, setCurrentTitle, name } = usePlayerStore();
  const { unlockedAchievements } = useAchievementsStore();

  const handleTitleChange = (titleId: AchievementId) => {
    setCurrentTitle(titleId);
    Toast.show({
      type: "info",
      text1: "Título Alterado!",
    });
  };

  const getAchievementName = (id: AchievementId | null) => {
    if (!id) return t("statistics.newbie");
    const achievement = achievementsList.find((a) => a.id === id);
    return achievement
      ? t(`achievements.${achievement.id}`, achievement.name)
      : t("statistics.newbie");
  };

  return (
    <SafeAreaView
      style={[styles.container, isDark && darkTheme.statistics.container]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("@/src/assets/img/teste.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={styles.profileContainer}>
          <Text
            style={[
              styles.profileName,
              isDark && darkTheme.statistics.profileName,
            ]}
          >
            {name || t("statistics.adventurer")}
          </Text>
          <Text
            style={[
              styles.profileTitle,
              isDark && darkTheme.statistics.profileTitle,
            ]}
          >
            {getAchievementName(currentTitle)}
          </Text>
        </View>
        <View style={[styles.section, isDark && darkTheme.statistics.section]}>
          <Text
            style={[
              styles.sectionTitle,
              isDark && darkTheme.statistics.sectionTitle,
            ]}
          >
            {t("statistics.habitStreak")}
          </Text>
          <View style={styles.habitStreakContainer}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Ionicons
                key={index}
                name="flame"
                size={moderateScale(24)}
                color={index < streak ? "#FFC107" : isDark ? "#444" : "#E0E0E0"}
              />
            ))}
          </View>
        </View>
        <View style={styles.statsRow}>
          <View
            style={[styles.statBox, isDark && darkTheme.statistics.statBox]}
          >
            <Text
              style={[
                styles.statValue,
                isDark && darkTheme.statistics.statValue,
              ]}
            >
              {String(streak).padStart(2, "0")}
            </Text>
            <Text
              style={[
                styles.statLabel,
                isDark && darkTheme.statistics.statLabel,
              ]}
            >
              {t("statistics.currentStreak")}
            </Text>
          </View>
          <View
            style={[styles.statBox, isDark && darkTheme.statistics.statBox]}
          >
            <Text
              style={[
                styles.statValue,
                isDark && darkTheme.statistics.statValue,
              ]}
            >
              {String(bestStreak).padStart(2, "0")}
            </Text>
            <Text
              style={[
                styles.statLabel,
                isDark && darkTheme.statistics.statLabel,
              ]}
            >
              {t("statistics.bestStreak")}
            </Text>
          </View>
        </View>
        <View style={[styles.section, isDark && darkTheme.statistics.section]}>
          <Text
            style={[
              styles.sectionTitle,
              isDark && darkTheme.statistics.sectionTitle,
            ]}
          >
            {t("statistics.achievements")}
          </Text>
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
                        isDark && darkTheme.statistics.achievementName,
                        !isUnlocked && { color: "#999" },
                      ]}
                    >
                      {t(`achievements.${ach.id}`, ach.name)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={[styles.button, isDark && darkTheme.statistics.button]}
          onPress={() => router.push("/private/settings")}
        >
          <Text
            style={[
              styles.tedxtButtonConfig,
              isDark && darkTheme.statistics.sectionTitle,
            ]}
          >
            Configurações
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
