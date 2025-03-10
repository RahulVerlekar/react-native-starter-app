//This will have a icon and text, it will be shown in a rounded container chip

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function Chip({ text }: { text: string }) {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.secondaryContainer }]}>
            <Text style={[styles.text, { color: theme.colors.onSecondaryContainer }]}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
});