import { Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Index' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="homepage" options={{ title: 'Home' }} />
        <Stack.Screen name="add-entry" options={{ title: 'Add Entry' }} />
        <Stack.Screen name="entry-details" options={{ title: 'Entry Details' }} />
        <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      </Stack>
    </>
  );
}
