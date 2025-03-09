import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { Typography } from "./components/Typography";

export default function Index() {
  const { theme } = useTheme();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Typography variant="h1" style={styles.title}>Navigation Demo</Typography>
      
      <View style={styles.linksContainer}>
        <Link href="/login" style={[styles.link, { backgroundColor: theme.colors.card, color: theme.colors.primary }]}>Go to Login</Link>
        <Link href="/homepage" style={[styles.link, { backgroundColor: theme.colors.card, color: theme.colors.primary }]}>Go to Home</Link>
        <Link href="/add-entry" style={[styles.link, { backgroundColor: theme.colors.card, color: theme.colors.primary }]}>Add Entry</Link>
        <Link href="/entry-details" style={[styles.link, { backgroundColor: theme.colors.card, color: theme.colors.primary }]}>View Entry Details</Link>
        <Link href="/signup" style={[styles.link, { backgroundColor: theme.colors.card, color: theme.colors.primary }]}>Sign Up</Link>
      </View>
      
      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  linksContainer: {
    alignItems: 'center',
    width: '80%',
  },
  link: {
    marginVertical: 10,
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
  }
});
