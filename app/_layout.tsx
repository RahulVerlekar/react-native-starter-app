import { Stack } from "expo-router";
import { ThemeProvider } from "./theme/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Index' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="homepage" options={{ title: 'Home' }} />
        <Stack.Screen name="add-entry" options={{ title: 'Add Entry' }} />
        <Stack.Screen name="entry-details" options={{ title: 'Entry Details' }} />
        <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      </Stack>
    </ThemeProvider>
  );
}
