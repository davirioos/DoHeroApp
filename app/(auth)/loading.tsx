import Loading from "@/src/screen/loading/loading";
import { Stack } from "expo-router";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Loading />
    </>
  );
}
