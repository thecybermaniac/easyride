import { Stack } from "expo-router";

const AuthLayout = () => {

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}

export default AuthLayout;