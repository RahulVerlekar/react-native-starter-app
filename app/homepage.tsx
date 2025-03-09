import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Alert, Animated, TouchableOpacity, Text, Pressable } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { H1, H2, Body } from "./components/Typography";
import { ThemeToggle } from "./components/ThemeToggle";
import { NavLink } from "./components/NavLink";
import ToolbarHeader from "./components/ToolbarHeader";
import ThreeLineText from "./components/ThreeLineText";
import { Ionicons } from '@expo/vector-icons';

export default function HomePage() {
    const { theme } = useTheme();
    const today = new Date().toLocaleDateString();
    const greeting = "Hello, Good Evening";
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const lastScrollY = useRef(0);

    const recentEntries = [
        { id: '1', caption: "MORNING REFLECTION", title: "A Fresh Start", body: "Woke up early today and went for a jog. The weather was perfect and it felt great to start the day with some exercise." },
        { id: '2', caption: "WORK UPDATE", title: "Productive Meeting", body: "Had a very productive meeting with the team. We discussed the new project and everyone is excited to get started." },
        { id: '3', caption: "EVENING REFLECTION", title: "Relaxing Evening", body: "Spent the evening reading a book and sipping on some tea. It was a peaceful end to a busy day." },
        { id: '4', caption: "DINNER WITH FRIENDS", title: "Great Food and Company", body: "Went out for dinner with some friends. The food was amazing and we had a lot of fun catching up." },
        { id: '5', caption: "NIGHT THOUGHTS", title: "Grateful for Today", body: "As I lay in bed, I feel grateful for all the good things that happened today. Looking forward to another great day tomorrow." },
    ];

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
            <Animated.FlatList
                data={recentEntries}
                renderItem={({ item }) => (
                    <ThreeLineText
                        caption={item.caption}
                        title={item.title}
                        body={item.body}
                        onClick={handleEntryClick}
                        param={item.title}
                    />
                )}
                keyExtractor={item => item.id}
            />

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
