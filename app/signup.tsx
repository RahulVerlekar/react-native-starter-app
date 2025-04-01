import { Link, useRouter } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "./theme/ThemeContext";
import { Body, H1 } from "./components/Typography";
import { useApi } from "./network/useApi";
import { getAuthToken, saveAuthToken } from "./network/AuthStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import Toolbar from "./components/NewToolbar";
import EditText from "./components/EditText";

export default function SignUp() {
    const { theme } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (email && phone && password && confirmPassword) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password, phone, confirmPassword])

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
        <SafeAreaView style={[styles.container]}>
            <View style={styles.toolbar}>
                <Toolbar
                    title="Sign Up"
                    hasBack={true}
                    onBackPress={() => {
                        router.dismiss()
                    }}
                />
            </View>
            <Image
                source={require('../assets/images/flow.png')}
                style={{ width: 78, height: 31, marginLeft: 16 }}
            />
            <View style={{ padding: 16 }}>
                <Text style={styles.header}>Hey Superstar! Let’s get started</Text>
                <Text style={styles.subheader}>Enter your details to get started</Text>
                <View style={{
                    width: '100%',
                    marginTop: 16,
                }} />
                <EditText
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <View style={{
                    width: '100%',
                    marginTop: 16,
                }} />
                <EditText
                    label="Mobile"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Mobile"
                    keyboardType="phone-pad"
                />
                <View style={{
                    width: '100%',
                    marginTop: 16,
                }} />
                <EditText
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    keyboardType="default"
                    secureTextEntry
                />
                <View style={{
                    width: '100%',
                    marginTop: 16,
                }} />
                <EditText
                    label="Re-enter Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Re-enter Password"
                    keyboardType="default"
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: theme.colors.primary, marginTop: 24 },
                        loading && { opacity: 0.5 },
                        disabled && { opacity: 0.5 }
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
                <Text style={styles.signupText}>
                    Already have an account? <Link href="/login" style={{ color: "#014E44" }}>Sign In</Link>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        marginTop: 8,
        color: "#8E8E93",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "DMSans-Regular",
    },
    toolbar: {
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        marginBottom: 24,
    },
    header: {
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "DMSans-Regular",
        color: "#333333",
    },
    subheader: {
        fontSize: 14,
        fontWeight: "300",
        fontFamily: "DMSans-Regular",
        color: "#333333",
        opacity: 0.8,
        marginTop: 4
    },
});
