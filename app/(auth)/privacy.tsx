import PrivacyScreen from "@/src/screen/privacy";
import { Stack } from "expo-router";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PrivacyScreen />
    </>
  );
}
