import ButtonMain from "@/src/components/buttonMain";
import InputUser from "@/src/components/inputUser";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import auth from "@react-native-firebase/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export default function Login() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const submitRef = React.useRef<() => void>(() => {});
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        router.replace("/private");
      })
      .catch((error) => {
        console.error("Erro no login:", error.code);
        const errorMessage =
          error.code === "auth/invalid-credential"
            ? t("login.invalidCredentialsError")
            : t("login.genericError");
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: errorMessage,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handlePasswordReset = () => {
    if (email.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("register.emailRequired"),
      });
      return;
    }
    setIsResetting(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setModalVisible(false);
        Toast.show({
          type: "success",
          text1: t("common.success"),
          text2: t("login.resetEmailSent"),
        });
      })
      .catch((error) => {
        console.error("Erro ao redefinir senha:", error);
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("login.resetEmailError"),
        });
      })
      .finally(() => setIsResetting(false));
  };

  return (
    <View style={[styles.container, isDark && darkTheme.authContainer]}>
      <InputUser
        onSubmit={onSubmit}
        getSubmitHandler={(handler) => {
          submitRef.current = handler;
        }}
      />
      <View>
        <Link href="/register">
          <Text style={[styles.linkText, isDark && darkTheme.authLinkText]}>
            {t("login.noAccount")}
          </Text>
        </Link>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={[styles.linkText, isDark && darkTheme.authLinkText]}>
            {t("login.forgotPassword")}
          </Text>
        </TouchableOpacity>
      </View>
      <ButtonMain
        title={t("login.enter")}
        onPress={() => submitRef.current()}
        isLoading={isLoading}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, isDark && darkTheme.modalView]}>
            <Text style={[styles.modalText, isDark && darkTheme.text]}>
              {t("login.resetPasswordTitle")}
            </Text>
            <TextInput
              style={[styles.input, isDark && darkTheme.input]}
              placeholder={t("login.emailPlaceholder")}
              placeholderTextColor={isDark ? "#888" : "#ccc"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ButtonMain
              title={t("login.sendEmail")}
              onPress={handlePasswordReset}
              isLoading={isResetting}
            />
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>{t("common.close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
}
