import { View, StyleSheet } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { H2, Typography } from "./components/Typography";
import { NavLink } from "./components/NavLink";
import Login from "./login";
import OnboardingScreen from "./onboarding";
import SignUp from "./signup";

export default function Index() {
  const { theme } = useTheme();

  return (
    <Login />
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
