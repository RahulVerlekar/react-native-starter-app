import { Link, useRouter } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "./theme/ThemeContext";
import { Body, H1 } from "./components/Typography";
import { useApi } from "./network/useApi";
import { saveAuthToken, getAuthToken } from "./network/AuthStorage";
import Toolbar from "./components/NewToolbar";
import { SafeAreaView } from "react-native-safe-area-context";
import EditText from "./components/EditText";

export default function Login() {
    const { theme } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect( () => {
        if (email && password) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[email, password])

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if (token) {
                router.replace("/homepage");
            }
        };
        checkAuth();
    }, []);

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
        <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
            <View style={styles.toolbar}>
                <Toolbar
                    title="Sign In"
                    hasBack={false}
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
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: theme.colors.primary, marginTop: 16 },
                        disabled && { opacity: 0.5 },
                        loading && { opacity: 0.5 }
                    ]}
                    onPress={handleLogin}
                    disabled={loading} >
                    <Text style={[styles.buttonText]}>
                        {loading ? "Logging in..." : "Sign In"}
                    </Text>
                </TouchableOpacity>
                {error && (
                    <Text style={{ color: 'red', marginTop: 10 }}>
                        {error.message}
                    </Text>
                )}
                <Text style={styles.signupText}>
                    Don't have any account? <Link href="/signup" style={{ color: "#014E44" }}>Sign Up</Link>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    toolbar: {
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        marginBottom: 24,
    },
    logoContainer: {
        height: 72,
        width: 72,
        backgroundColor: "#fff",
        margin: 8,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
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
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "DMSans-Regular",
        color: "#fff",
    },
    signupText: {
        marginTop: 20,
        color: "#8E8E93",
        fontSize: 14,
        fontWeight: "700",
        fontFamily: "DMSans-Regular",
    },
});