import { Stack } from "expo-router";

export default function PrivateLayout() {
  // Aqui não precisa mais verificar o usuário,
  // porque o Loading.tsx já cuidou disso.
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
