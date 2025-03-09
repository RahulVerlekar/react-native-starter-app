import { View, StyleSheet } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { H2, Typography } from "./components/Typography";
import { NavLink } from "./components/NavLink";

export default function Index() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Typography variant="h1" style={styles.title}>Navigation Demo</Typography>

      <View style={styles.linksContainer}>
        <NavLink to="/login">Go to Login</NavLink>
        <NavLink to="/homepage">Go to Home</NavLink>
        <NavLink to="/add-entry">Add Entry</NavLink>
        <NavLink to="/entry-details">View Entry Details</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <H2>Design System</H2>
        <NavLink to="/typography">Typography Guide</NavLink>
        <NavLink to="/components">UI Components</NavLink>
      </View>

      <ThemeToggle />
    </View>
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
    width: '80%',
  },
});
