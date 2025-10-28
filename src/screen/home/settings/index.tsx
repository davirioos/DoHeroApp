import i18n from "@/src/locales/i18n";
import { resetAllStores } from "@/src/stores/resetStores/storeReset";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    Alert.alert(
      t("settings.logoutConfirmTitle"),
      t("settings.logoutConfirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.confirm"),
          onPress: async () => {
            try {
              await auth().signOut();
              await resetAllStores();
              router.replace("/login");
            } catch (error) {
              console.error("Erro ao fazer logout:", error);
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t("settings.deleteAccountConfirmTitle"),
      t("settings.deleteAccountConfirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth().currentUser;
              if (user) {
                await user.delete();
                await resetAllStores();
                router.replace("/login");
              }
            } catch (error) {
              console.error("Erro ao excluir conta:", error);
              Toast.show({
                type: "error",
                text1: t("common.error"),
                text2: t("settings.deleteAccountError"),
              });
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, isDark && darkTheme.settings.container]}>
      <Text style={[styles.title, isDark && darkTheme.settings.title]}>
        {t("settings.title")}
      </Text>

      {/* Seção de Idioma */}
      <Text
        style={[styles.sectionTitle, isDark && darkTheme.settings.sectionTitle]}
      >
        {t("settings.language")}
      </Text>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            isDark && darkTheme.settings.languageButton,
            i18n.language === "pt" &&
              (isDark
                ? darkTheme.settings.languageButtonSelected
                : styles.languageButtonSelected),
          ]}
          onPress={() => changeLanguage("pt")}
        >
          <Text
            style={[
              styles.languageButtonText,
              isDark && darkTheme.settings.languageButtonText,
            ]}
          >
            {t("settings.portuguese")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            isDark && darkTheme.settings.languageButton,
            i18n.language === "en" &&
              (isDark
                ? darkTheme.settings.languageButtonSelected
                : styles.languageButtonSelected),
          ]}
          onPress={() => changeLanguage("en")}
        >
          <Text
            style={[
              styles.languageButtonText,
              isDark && darkTheme.settings.languageButtonText,
            ]}
          >
            {t("settings.english")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Seção de Tema */}
      <Text
        style={[styles.sectionTitle, isDark && darkTheme.settings.sectionTitle]}
      >
        {t("settings.theme")}
      </Text>
      <View
        style={[
          styles.themeContainer,
          isDark && darkTheme.settings.themeContainer,
        ]}
      >
        <Text
          style={[styles.themeText, isDark && darkTheme.settings.themeText]}
        >
          {t("settings.darkMode")}
        </Text>
        <Switch
          trackColor={{
            false: "#767577",
            true: isDark ? "#BB86FC" : "#81b0ff",
          }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDark}
        />
      </View>

      {/* Seção da Conta */}
      <Text
        style={[
          styles.sectionTitle,
          { marginTop: 30 },
          isDark && darkTheme.settings.sectionTitle,
        ]}
      >
        {t("settings.account")}
      </Text>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={[
            styles.accountButton,
            isDark && { backgroundColor: "#1E1E1E", borderColor: "#333" },
          ]}
          onPress={handleLogout}
        >
          <Text style={[styles.accountButtonText, isDark && { color: "#FFF" }]}>
            {t("settings.logout")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.accountButton, styles.deleteButton]}
          onPress={handleDeleteAccount}
        >
          <Text style={[styles.accountButtonText, styles.deleteButtonText]}>
            {t("settings.deleteAccount")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
