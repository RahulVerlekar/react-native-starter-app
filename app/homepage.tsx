import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Animated, Pressable, TouchableOpacity, Text } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { H1, H2, Body } from "./components/Typography";
import ThreeLineText from "./components/ThreeLineText";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useApi } from "./network/useApi";
import { SessionModel } from './domain/models/session.model';
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearAuthToken } from './network/AuthStorage';
import TwoLineText from './components/TwoLineText';

export default function HomePage() {
    const { theme } = useTheme();
    const router = useRouter();
    const today = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const { refreshData } = useLocalSearchParams<{
        refreshData?: string
    }>();
    const [scrollY, setScrollY] = useState(new Animated.Value(0));

    const { data: recentEntries, loading, error, execute: fetchEntries } = useApi<SessionModel[]>(
        (client) => client.getUserSessions(),
        { immediate: true }
    );

    const getDayTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good Morning";
        } else if (hour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    }
    const greeting = "Hello, " + getDayTimeGreeting() + "!";

    useEffect(() => {
        fetchEntries().catch(console.error);
    }, [refreshData]);

    const handleEntryClick = (param?: SessionModel) => {
        router.push({
            pathname: "/entry-details",
            params: { sessionId: param?.id },
        });
    };

    const handleNewEntry = () => {
        router.push("/add-entry-multiquestion");
    };

    function renderItem(item: SessionModel) {
        return (
            <Pressable onPress={() => handleEntryClick(item)}>
                <View style={[styles.section]}>
                    <Text>{item.summaryTitle}</Text>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: theme.spacing.md,
                backgroundColor: "#fff",
            }}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.dateText}>{today}</Text>
                <TouchableOpacity onPress={() => Alert.alert("Logout", "Are you sure you want to logout?", [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Logout", onPress: () => {
                            clearAuthToken();
                            router.replace("/");
                        }
                    }
                ])}>
                    <MaterialIcons name="logout" size={24} color='red' />
                </TouchableOpacity>
            </View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={[styles.subtitle]}>Your Journey</Text>
            {loading ? (
                <Body>Loading...</Body>
            ) : error ? (
                <Body>Error loading entries</Body>
            ) : (
                <Animated.FlatList
                    data={recentEntries}
                    renderItem={({ item }) => (
                        renderItem(item)
                    )}
                    keyExtractor={item => item.id}
                />
            )}

            <Animated.View style={[styles.fabContainer, { transform: [{ translateY: scrollY }] }]}>
                <Pressable style={[styles.fab, { backgroundColor: "#014E44" }]} onPress={handleNewEntry}>
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
        marginTop: 20,
        color: "#333333",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "DMSans-Regular",
    },
    itemContainer: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginVertical: 8,
        marginHorizontal: 16,
    },
    section: {
        marginBottom: 4,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#EBFEF8",
        marginVertical: 8,
        color: "#333333",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "DMSans-Regular",
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
        width: 160,
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
        paddingVertical: 16,
        borderRadius: 28,
        elevation: 4,
    },
    fabText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 16,
    },
    dateText: {
        marginTop: 16,
        marginBottom: 16,
        color: "#666666",
        fontSize: 12,
        fontWeight: "600",
        fontFamily: "DMSans-Regular",
    },
    greeting: {
        color: "#1A3234",
        fontSize: 24,
        fontWeight: "600",
        fontFamily: "DMSans-Regular",
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
