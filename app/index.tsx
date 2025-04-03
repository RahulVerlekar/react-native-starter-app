import { StyleSheet } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import Login from "./login";
import OnboardingScreen from "./onboarding";

export default function Index() {
  const { theme } = useTheme();

  return (
    <OnboardingScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
  },
  linksContainer: {
    alignItems: 'center',
    width: 280,
  },
});
