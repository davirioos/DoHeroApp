import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function TermsScreen() {
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
            {t("terms.backToRegister")}
          </Text>
        </Link>
        <Text style={[styles.title, isDark && darkTheme.authTitle]}>
          {t("terms.title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("terms.p1")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("terms.section1Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("terms.section1Text")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("terms.section2Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("terms.section2Text")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("terms.section3Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("terms.section3Text")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("terms.section4Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("terms.section4Text")}
        </Text>
        <Text style={[styles.sectionTitle, isDark && darkTheme.authTitle]}>
          {t("terms.section5Title")}
        </Text>
        <Text style={[styles.paragraph, isDark && { color: "#ccc" }]}>
          {t("terms.section5Text")}
        </Text>
        <Text style={styles.lastUpdated}>{t("terms.lastUpdated")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
