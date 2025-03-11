import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Animated, Pressable } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { H1, H2, Body } from "./components/Typography";
import ThreeLineText from "./components/ThreeLineText";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useApi } from "./network/useApi";
import { SessionModel } from './domain/models/session.model';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearAuthToken } from './network/AuthStorage';

export default function HomePage() {
    const { theme } = useTheme();
    const router = useRouter();
    const today = new Date().toLocaleDateString();
    const greeting = "Hello, Good Evening";
    const [scrollY, setScrollY] = useState(new Animated.Value(0));

    const { data: recentEntries, loading, error, execute: fetchEntries } = useApi<SessionModel[]>(
        (client) => client.getUserSessions(),
        { immediate: true }
    );

    useEffect(() => {
        fetchEntries().catch(console.error);
    }, []);

    const handleEntryClick = (param?: SessionModel) => {
        router.push({
            pathname: "/entry-details",
            params: { sessionId: param?.id },
        });
    };

    const handleNewEntry = () => {
        router.push("/add-entry");
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
                padding: theme.spacing.md,
            }}
        >
            <View style={styles.headerContainer}>
                <H1 style={styles.greeting}>{greeting}</H1>
                <Pressable onPress={() => Alert.alert("Logout", "Are you sure you want to logout?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Logout", onPress: () => {
                        clearAuthToken();
                        router.replace("/");
                    } }
                ])}>
                    <MaterialIcons name="logout" size={24} color='red' />
                </Pressable>
            </View>
            <H2 style={[styles.subtitle, { marginBottom: 4 }]}>Your journal entries</H2>
            {loading ? (
                <Body>Loading...</Body>
            ) : error ? (
                <Body>Error loading entries</Body>
            ) : (
                <Animated.FlatList
                    data={recentEntries}
                    renderItem={({ item }) => (
                        <ThreeLineText
                            caption={item.frameworkTitle}
                            title={item.summaryTitle}
                            body={item.summary}
                            onClick={handleEntryClick}
                            param={item}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            )}

            <Animated.View style={[styles.fabContainer, { transform: [{ translateY: scrollY }] }]}>
                <Pressable style={[styles.fab, { backgroundColor: theme.colors.onBackground }]} onPress={handleNewEntry}>
                    <Ionicons name="add" size={24} color="white" />
                    <Body style={styles.fabText}>New Entry</Body>
                </Pressable>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    subtitle: {
        marginTop: 8,
    },
    section: {
        marginBottom: 24,
    },
    links: {
        marginTop: 16,
    },
    link: {
        marginBottom: 16,
    },
    themeToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    themeLabel: {
        marginRight: 12,
    },
    fabContainer: {
        width: 200,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 64,
        transform: [{ translateX: -70 }],
    },
    fab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6200ee',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 28,
        elevation: 4,
    },
    fabText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 16,
    },
    greeting: {
        marginTop: 16,
        marginBottom: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
