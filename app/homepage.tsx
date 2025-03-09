import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Animated, Pressable } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { H1, H2, Body } from "./components/Typography";
import ToolbarHeader from "./components/ToolbarHeader";
import ThreeLineText from "./components/ThreeLineText";
import { Ionicons } from '@expo/vector-icons';
import { useApi } from "./network/useApi";
import { JournalEntryModel } from "./domain/models/journal-entry.model";
import { SessionModel } from './domain/models/session.model';

export default function HomePage() {
    const { theme } = useTheme();
    const today = new Date().toLocaleDateString();
    const greeting = "Hello, Good Evening";
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const lastScrollY = useRef(0);

    const { data: recentEntries, loading, error, execute: fetchEntries } = useApi<SessionModel[]>(
        (client) => client.getUserSessions(),
        { immediate: true }
    );

    useEffect(() => {
        fetchEntries().catch(console.error);
    }, []);

    const handleEntryClick = (param?: any) => {
        Alert.alert("Entry Clicked", `You clicked on: ${param}`);
    };

    const handleNewEntry = () => {
        Alert.alert("New Entry", "Create a new entry.");
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
                padding: theme.spacing.md,
            }}
        >
            <ToolbarHeader title={today} />
            <H1>{greeting}</H1>
            <H2>Recent Entries</H2>
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
        </View>
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
});
