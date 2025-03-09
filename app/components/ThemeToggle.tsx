import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Typography } from './Typography';

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark, theme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={toggleTheme}
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.toggleContent}>
        <Typography style={{ color: theme.colors.text }}>
          {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});