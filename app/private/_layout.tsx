// app/private/_layout.tsx
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function PrivateLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      {/* Rota para as abas principais */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Rota para a tela de Configurações */}
      <Stack.Screen
        name="settings"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
