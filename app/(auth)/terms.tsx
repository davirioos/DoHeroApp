import TermsScreen from "@/src/screen/terms";
import { Stack } from "expo-router";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TermsScreen />
    </>
  );
}
