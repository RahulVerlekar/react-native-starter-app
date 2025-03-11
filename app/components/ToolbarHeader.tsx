import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

interface ToolbarHeaderProps {
    title: string;
    leftIcon?: ReactNode;
}

export default function ToolbarHeader({ title, leftIcon }: ToolbarHeaderProps) {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {leftIcon || (
                <TouchableOpacity>
                    <FontAwesome name="fire" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            )}
            <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
            <View style={styles.icons}>
                <TouchableOpacity>
                    <Ionicons name="book" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="settings" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
});
