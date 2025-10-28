import ButtonMain from "@/src/components/buttonMain";
import InputRegister from "@/src/components/inputRegister";
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import { useThemeStore } from "@/src/stores/themeStore/themeStore";
import { darkTheme } from "@/src/styles/darkTheme";
import auth from "@react-native-firebase/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export default function Register() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const submitRef = React.useRef<() => void>(() => {});
  const { setName } = usePlayerStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(data.email, data.password);
      setName(data.nome);
      router.replace("/private");
    } catch (error: any) {
      let errorTitle = t("register.title");
      let errorMessage = "Não foi possível criar sua conta. Tente novamente.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este endereço de e-mail já está em uso.";
          break;
        case "auth/weak-password":
          errorTitle = "Senha Fraca";
          errorMessage = "A senha deve ter pelo menos 6 caracteres.";
          break;
        default:
          console.error("Erro ao criar usuário:", error);
          break;
      }
      Toast.show({
        type: "error",
        text1: errorTitle,
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDark && darkTheme.authContainer]}>
      <InputRegister
        onSubmit={onSubmit}
        getSubmitHandler={(handler) => {
          submitRef.current = handler;
        }}
      />
      <Link href="/login">
        <Text style={[styles.linkText, isDark && darkTheme.authLinkText]}>
          {t("register.alreadyHaveAccount")}
        </Text>
      </Link>
      <ButtonMain
        title={t("register.title")}
        onPress={() => submitRef.current()}
        isLoading={isLoading}
      />
      <Toast />
    </View>
  );
}
