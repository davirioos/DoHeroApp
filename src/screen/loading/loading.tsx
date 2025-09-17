// src/screen/loading/loading.tsx
import { usePlayerStore } from "@/src/stores/playerStore/playerStore";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function Loading() {
  // --- ALTERAÇÕES AQUI ---
  const isInitialized = usePlayerStore((state) => state.isInitialized);
  const hasHydrated = usePlayerStore((state) => state._hasHydrated);

  useEffect(() => {
    // A lógica de navegação agora só é executada QUANDO a hidratação estiver completa
    if (hasHydrated) {
      if (isInitialized) {
        // Se o usuário já passou pelo registro, vai para o app
        router.replace("/private");
      } else {
        // Se é a primeira vez, vai para a tela de registro
        router.replace("/register");
      }
    }
  }, [hasHydrated, isInitialized]); // A lógica agora depende dos dois estados

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2ECC71", "#1D9C53"]}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      >
        <Image
          source={require("@/src/assets/img/loadingAvart.png")}
          style={{ width: "70%", height: "40%" }}
          resizeMode="contain"
        />
        <Image
          source={require("@/src/assets/img/logoLigth.png")}
          style={{ width: "50%", height: "8%" }}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
