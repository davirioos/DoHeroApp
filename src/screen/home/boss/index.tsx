import { useBossStore } from "@/src/stores/bossStore/bossStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function BossGamificado() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const { hp, maxHp, endDate, isDefeated } = useBossStore();

  const progresso = maxHp > 0 ? hp / maxHp : 0;

  let diasRestantes = 0;
  if (endDate) {
    const diffTime = new Date(endDate).getTime() - new Date().getTime();
    diasRestantes = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  return (
    <SafeAreaView style={[styles.container, isDark && darkTheme.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.containerHeader}>
          <Text style={[styles.tituloText, isDark && darkTheme.text]}>
            {t("boss.title")}
          </Text>
        </View>

        <View style={[styles.containerProgress, isDark && darkTheme.card]}>
          <Text style={[styles.subText, isDark && darkTheme.subtext]}>
            {diasRestantes > 0
              ? t("boss.daysLeft", { count: diasRestantes })
              : t("boss.challengeEnded")}
          </Text>
          <Progress.Bar
            progress={progresso}
            width={250}
            height={12}
            color={isDefeated ? "#2ECC71" : "#D9534F"}
            unfilledColor={isDark ? "#333" : "#f0f0f0"}
            borderColor={isDark ? "#1E1E1E" : "#fff"}
          />
          <Text
            style={[
              styles.subText,
              { marginTop: 5 },
              isDark && darkTheme.subtext,
            ]}
          >
            {t("boss.damage", { hp, maxHp })}
          </Text>
        </View>

        <Image
          source={require("../../../assets/img/returnCoffeeMarronzinho.png")}
          style={styles.image}
        />

        <View style={[styles.rewardsContainer, isDark && darkTheme.card]}>
          <Text style={[styles.rewardsTitle, isDark && darkTheme.text]}>
            {t("boss.rewardsTitle")}
          </Text>
          <View style={styles.rewardsRow}>
            <View style={styles.rewardItem}>
              <Ionicons name="logo-bitcoin" size={24} color="#FFD700" />
              <Text style={[styles.rewardText, isDark && darkTheme.subtext]}>
                {t("boss.goldReward", { amount: 1000 })}
              </Text>
            </View>
            <View style={styles.rewardItem}>
              <Ionicons name="star" size={24} color="#3498db" />
              <Text style={[styles.rewardText, isDark && darkTheme.subtext]}>
                {t("boss.xpReward", { amount: 500 })}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
