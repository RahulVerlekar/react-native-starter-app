import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Typography } from './Typography';

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark, theme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={toggleTheme}
      style={[styles.container, { 
        backgroundColor: theme.colors.secondaryContainer,
        borderColor: theme.colors.outline,
        borderWidth: 1,
        shadowColor: theme.dark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)', // Add subtle shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3, // For Android
      }]}
    >
      <View style={styles.toggleContent}>
        <Typography style={{ 
          color: theme.colors.onSecondaryContainer, 
          fontWeight: '500' // Medium weight for better readability
        }}>
          {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12, // Slightly more padding
    borderRadius: 10, // Slightly more rounded
    alignItems: 'center',
    marginVertical: 12, // More vertical margin
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});