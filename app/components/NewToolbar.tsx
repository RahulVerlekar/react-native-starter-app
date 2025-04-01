import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface ToolbarHeaderProps {
    title: string;
    hasBack: boolean;
    onBackPress?: () => void;
}

export default function Toolbar({ title, hasBack, onBackPress }: ToolbarHeaderProps) {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {hasBack && (
                <TouchableOpacity onPress={onBackPress} style={{ marginRight: 16 }}>
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            )}
            <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'DMSans-Regular',
        color: '#333333',
        flex: 1
    }
});
