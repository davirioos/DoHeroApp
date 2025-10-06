// src/screen/register/index.tsx
import ButtonMain from "@/src/components/buttonMain";
import InputRegister from "@/src/components/inputRegister";
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import auth from "@react-native-firebase/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export default function Register() {
  const submitRef = React.useRef<() => void>(() => {});
  const { setName } = usePlayerStore(); // Obter a função setName do store
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(data.email, data.password);
      setName(data.nome);

      router.replace("/private");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          Toast.show({
            type: "error",
            text1: "Erro no Cadastro",
            text2: "Este endereço de e-mail já está em uso.",
          });
          break;
        case "auth/weak-password":
          Toast.show({
            type: "error",
            text1: "Senha Fraca",
            text2: "A senha deve ter pelo menos 6 caracteres.",
          });
          break;
        default:
          Toast.show({
            type: "error",
            text1: "Erro no Cadastro",
            text2: "Não foi possível criar sua conta. Tente novamente.",
          });
          console.error("Erro ao criar usuário:", error);
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <InputRegister
        onSubmit={onSubmit}
        getSubmitHandler={(handler) => {
          submitRef.current = handler;
        }}
      />
      <Link href="/login">
        <Text style={styles.linkText}>Já tenho uma conta</Text>
      </Link>
      <ButtonMain
        title="Cadastrar"
        onPress={() => submitRef.current()}
        isLoading={isLoading}
      />
      <Toast />
    </View>
  );
}
