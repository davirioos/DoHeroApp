// app/_layout.tsx
import { Cinzel_700Bold, useFonts } from "@expo-google-fonts/cinzel";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Previne que a tela de splash suma antes dos preparativos
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // --- LÓGICA DE FONTES (EXISTENTE) ---
  const [fontsLoaded, fontError] = useFonts({
    Cinzel_700Bold,
  });

  // --- LÓGICA DE AUTENTICAÇÃO (NOVA) ---
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Efeito para "ouvir" o estado de autenticação do Firebase
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((_user) => {
      setUser(_user); // Define o usuário (ou null)
      if (initializing) {
        setInitializing(false); // Marca que a verificação inicial terminou
      }
    });
    return unsubscribe; // Limpa o "ouvinte" ao desmontar
  }, []);

  // Efeito para navegar baseado no status de auth e fontes
  useEffect(() => {
    // Só toma uma decisão depois que as fontes carregaram E o Firebase verificou o auth
    if (!initializing && (fontsLoaded || fontError)) {
      if (user) {
        // Se tem usuário, vai para a área privada
        router.replace("/private");
      } else {
        // Se não tem, vai para a tela de login
        router.replace("/(auth)/login");
      }
      SplashScreen.hideAsync(); // Esconde a splash screen
    }
  }, [initializing, fontsLoaded, fontError, user]); // Reage a qualquer uma dessas mudanças

  // Se as fontes ou o Firebase ainda estão carregando, não renderiza nada
  if (initializing || (!fontsLoaded && !fontError)) {
    return null; // A tela de splash continua visível
  }

  // Renderiza a estrutura de navegação principal
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="private" />
      </Stack>
    </GestureHandlerRootView>
  );
}
