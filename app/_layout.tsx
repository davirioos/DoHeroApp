// app/_layout.tsx (CÓDIGO ORIGINAL)
import { Cinzel_700Bold, useFonts } from "@expo-google-fonts/cinzel";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Cinzel_700Bold,
  });

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((_user) => {
      setUser(_user); 
      if (initializing) {
        setInitializing(false); 
      }
    });
    return unsubscribe; 
  }, []);

  useEffect(() => {
    if (!initializing && (fontsLoaded || fontError)) {
      if (user) {
        // Se tem usuário, vai para a área privada
        router.replace("/private");
      } else {
        // Se não tem, vai para a tela de login
        router.replace("/(auth)/login");
      }
      SplashScreen.hideAsync(); 
    }
  }, [initializing, fontsLoaded, fontError, user]); 

  if (initializing || (!fontsLoaded && !fontError)) {
    return null; 
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="private" />
      </Stack>
    </GestureHandlerRootView>
  );
}