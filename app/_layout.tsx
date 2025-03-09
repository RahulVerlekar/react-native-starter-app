import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

function RootLayoutNav() {
  const { fontsLoaded } = useTheme();
  
  if (!fontsLoaded) {
    return <View style={{ flex: 1 }} />; // Empty view while fonts are loading
  }
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Index' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="homepage" options={{ title: 'Home' }} />
      <Stack.Screen name="add-entry" options={{ title: 'Add Entry' }} />
      <Stack.Screen name="entry-details" options={{ title: 'Entry Details' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="typography" options={{ title: 'Typography Guide' }} />
      <Stack.Screen name="components" options={{ title: 'UI Components' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar />
      <RootLayoutNav />
    </ThemeProvider>
  );
}
