import Login from "@/src/screen/login";
import { Stack } from "expo-router";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Login />
    </>
  );
}
