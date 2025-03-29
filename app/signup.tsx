import { Link, useRouter } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "./theme/ThemeContext";
import { Body, H1 } from "./components/Typography";
import { useApi } from "./network/useApi";
import { getAuthToken, saveAuthToken } from "./network/AuthStorage";

export default function SignUp() {
    const { theme } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = async () => {
            const token = await getAuthToken();
            if (token) {
                router.replace("/homepage");
            }
        };
        checkAuth();
    }, []);

    const { loading, error, execute: executeRegister } = useApi(
        (client, email, phone, password) => client.register(email, phone, password),
        {
            onSuccess: async () => {
                // After successful registration, log the user in
                const loginResponse = await executeLogin(email, password);
                await saveAuthToken(loginResponse.accessToken);
                router.replace("/homepage");
            }
        }
    );

    const { execute: executeLogin } = useApi(
        (client, email, password) => client.login(email, password),
        { immediate: false }
    );

    const handleSignUp = async () => {
        if (!email || !phone || !password || !confirmPassword) {
            Alert.alert("Missing Fields", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match");
            return;
        }

        try {
            await executeRegister(email, phone, password);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.logoContainer}>
                {/* Add your logo here */}
            </View>
            <H1 style={styles.title}>Sign Up</H1>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Email</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 4, paddingStart: 4, paddingTop: 4 }]}
                    placeholder="Email"
                    placeholderTextColor={theme.colors.primary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8, marginTop: 24 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Phone</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 4, paddingStart: 4, paddingTop: 4 }]}
                    placeholder="Phone"
                    placeholderTextColor={theme.colors.primary}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8, marginTop: 24 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Password</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 4, paddingStart: 4, paddingTop: 4}]}
                    placeholder="Password"
                    placeholderTextColor={theme.colors.primary}
                    autoCapitalize="none"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 8, marginTop: 24 }}>
                <Body style={{ color: theme.colors.text, textAlign: 'left', width: '100%', paddingStart: 4 }}>Re-enter Password</Body>
                <TextInput
                    style={[styles.input, { borderColor: '#00000000', color: theme.colors.primary, paddingBottom: 4, paddingStart: 4, paddingTop: 4 }]}
                    placeholder="Re-enter Password"
                    placeholderTextColor={theme.colors.primary}
                    autoCapitalize="none"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    { backgroundColor: theme.colors.primary, marginTop: 24 },
                    loading && { opacity: 0.7 }
                ]}
                onPress={handleSignUp}
                disabled={loading}
            >
                <Text style={[styles.buttonText, { color: theme.colors.background }]}>
                    {loading ? "Signing up..." : "Sign Up"}
                </Text>
            </TouchableOpacity>
            {error && (
                <Text style={{ color: 'red', marginTop: 10 }}>
                    {error.message}
                </Text>
            )}
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
