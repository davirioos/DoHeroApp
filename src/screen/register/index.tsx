// src/screen/register/index.tsx
import ButtonMain from "@/src/components/buttonMain";
import InputRegister from "@/src/components/inputRegister";
import auth from "@react-native-firebase/auth";
import { Link, router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Register() {
  const submitRef = React.useRef<() => void>(() => {});

  // --- FUNÇÃO onSubmit CORRIGIDA COM ASYNC/AWAIT E CHAMADA EXPLÍCITA ---
  const onSubmit = async (data: any) => {
    console.log("Tentando criar usuário com o Firebase:", data.email);
    try {
      // 1. Espera a criação do usuário no Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      console.log(
        "Usuário criado no Auth com sucesso! Inicializando dados no Firestore..."
      );

      // 3. SÓ ENTÃO, navega para a tela principal
      router.replace("/private");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Este e-mail já está em uso.");
        // Você pode adicionar um Toast aqui para avisar o usuário
      } else {
        console.error("Erro ao criar usuário:", error);
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
      <ButtonMain title="Cadastrar" onPress={() => submitRef.current()} />
    </View>
  );
}
