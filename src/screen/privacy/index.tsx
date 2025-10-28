import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function PrivacyScreen() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <SafeAreaView style={[styles.container, isDark && darkTheme.authContainer]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Link href="/register" style={styles.backButton}>
          <Text
            style={[styles.backButtonText, isDark && darkTheme.authLinkText]}
          >
            {t("privacy.backToRegister")}
          </Text>
        </Link>
        <Text style={[styles.title, isDark && darkTheme.authTitle]}>
          {t("privacy.title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("privacy.p1")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("privacy.section1Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("privacy.section1Text")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("privacy.section2Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("privacy.section2Text")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("privacy.section3Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("privacy.section3Text")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("privacy.section4Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("privacy.section4Text")}
        </Text>
        <Text style={styles.lastUpdated}>{t("privacy.lastUpdated")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
