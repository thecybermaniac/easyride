import { useFetch } from "@/lib/fetch";
import { useDriverStore } from "@/store";
import { Stack } from "expo-router";

const AuthLayout = () => {

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="find-ride" options={{ headerShown: false }} />
        <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
        <Stack.Screen name="book-ride" options={{ headerShown: false }} />
      </Stack>
  );
}

export default AuthLayout;