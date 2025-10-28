import Register from "@/src/screen/register";
import { Stack } from "expo-router";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Register />
    </>
  );
}
