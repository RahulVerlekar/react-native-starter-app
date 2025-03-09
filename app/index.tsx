import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Navigation Demo</Text>
      
      <View style={styles.linksContainer}>
        <Link href="/login" style={styles.link}>Go to Login</Link>
        <Link href="/homepage" style={styles.link}>Go to Home</Link>
        <Link href="/add-entry" style={styles.link}>Add Entry</Link>
        <Link href="/entry-details" style={styles.link}>View Entry Details</Link>
        <Link href="/signup" style={styles.link}>Sign Up</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  linksContainer: {
    alignItems: 'center',
    width: '80%',
  },
  link: {
    marginVertical: 10,
    fontSize: 18,
    color: 'blue',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
  }
});
