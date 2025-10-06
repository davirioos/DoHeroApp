// src/screen/login/index.tsx
import ButtonMain from "@/src/components/buttonMain";
import InputUser from "@/src/components/inputUser";
import auth from "@react-native-firebase/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

export default function Login() {
  const submitRef = React.useRef<() => void>(() => {});
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        router.replace("/private");
      })
      .catch((error) => {
        console.error("Erro no login:", error.code); // Log para depuração
        if (error.code === "auth/invalid-credential") {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "E-mail ou senha inválidos.",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Ocorreu um erro ao tentar fazer login.",
          });
        }
      });
  };

  const handlePasswordReset = () => {
    if (email.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Por favor, insira seu e-mail.",
      });
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setModalVisible(false);
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "E-mail de redefinição enviado!",
        });
      })
      .catch((error) => {
        console.error("Erro ao redefinir senha:", error); // Log para depuração
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Ocorreu um erro ao tentar redefinir a senha.",
        });
      });
  };

  return (
    <View style={styles.container}>
      <InputUser
        onSubmit={onSubmit}
        getSubmitHandler={(handler) => {
          submitRef.current = handler;
        }}
      />
      <View>
        <Link href="/register">
          <Text style={styles.linkText}>Não tenho uma conta</Text>
        </Link>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
      <ButtonMain title="Entrar" onPress={() => submitRef.current()} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Redefinir Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ButtonMain
              title="Enviar"
              onPress={() => submitRef.current()}
              isLoading={isLoading}
            />
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
}
