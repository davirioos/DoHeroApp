import SettingsScreen from "@/src/screen/home/settings";
import { Stack } from "expo-router";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SettingsScreen />
    </>
  );
}
