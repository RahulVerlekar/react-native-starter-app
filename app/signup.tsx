import { Link } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { Body, H1 } from "./components/Typography";

export default function SignUp() {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.logoContainer}>
                {/* Add your logo here */}
            </View>
            <H1 style={styles.title}>Sign Up</H1>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Email</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 0 }]}
                    placeholder="Email"
                    placeholderTextColor={theme.colors.primary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8, marginTop: 24 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Phone</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 0 }]}
                    placeholder="Phone"
                    placeholderTextColor={theme.colors.primary}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                />
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8, marginTop: 24 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Password</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 0 }]}
                    placeholder="Password"
                    placeholderTextColor={theme.colors.primary}
                    autoCapitalize="none"
                    secureTextEntry
                />
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8, marginTop: 24 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Re-enter Password</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 0 }]}
                    placeholder="Re-enter Password"
                    placeholderTextColor={theme.colors.primary}
                    autoCapitalize="none"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary, marginTop: 24 }]}>
                <Text style={[styles.buttonText, { color: theme.colors.background }]}>Sign Up</Text>
            </TouchableOpacity>
            <Body style={styles.signupText}>
                Already have an account? <Link href="/login" style={{ color: theme.colors.primary }}>Login</Link>
            </Body>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    logoContainer: {
        marginBottom: 40,
        // Add styles for your logo container
    },
    title: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        fontSize: 16,
    },
    button: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupText: {
        marginTop: 20,
    },
});
