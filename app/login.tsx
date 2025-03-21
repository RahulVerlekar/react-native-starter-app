import { Link, useRouter } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useTheme } from "./theme/ThemeContext";
import { Body, H1 } from "./components/Typography";
import { useApi } from "./network/useApi";
import { saveAuthToken } from "./network/AuthStorage";

export default function Login() {
    const { theme } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState("rahulverlekar@gmail.com");
    const [password, setPassword] = useState("password123");

    const { loading, error, execute: executeLogin } = useApi(
        (client, email, password) => client.login(email, password),
        {
            onSuccess: async (response) => {
                await saveAuthToken(response.accessToken);
                router.replace("/homepage");
            }
        }
    );

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Missing Fields", "Please enter both email and password");
            return;
        }
        try {
            await executeLogin(email, password);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.logoContainer}>
                {/* Add your logo here */}
            </View>
            <H1 style={styles.title}>Login</H1>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Email</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 0 }]}
                    placeholder="Email"
                    placeholderTextColor={theme.colors.primary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
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
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: theme.colors.primary, marginTop: 24 },
                    loading && { opacity: 0.7 }
                ]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={[styles.buttonText, { color: theme.colors.background }]}>
                    {loading ? "Logging in..." : "Login"}
                </Text>
            </TouchableOpacity>
            {error && (
                <Text style={{ color: 'red', marginTop: 10 }}>
                    {error.message}
                </Text>
            )}
            <Body style={styles.signupText}>
                Don't have any account? <Link href="/signup" style={{ color: theme.colors.primary }}>Sign Up</Link>
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