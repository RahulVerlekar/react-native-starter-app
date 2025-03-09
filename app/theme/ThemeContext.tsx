import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, getTheme } from './theme';
import { loadFonts } from '../utils/fontLoader';
import * as SplashScreen from 'expo-splash-screen';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  fontsLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(colorScheme === 'dark');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (colorScheme) {
      setIsDark(colorScheme === 'dark');
    }
  }, [colorScheme]);

  // Load fonts when the component mounts
  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        // Wait for a brief moment to ensure fonts are properly registered
        await new Promise(resolve => setTimeout(resolve, 100));
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error loading app resources:', e);
      }
    }

    prepare();
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = getTheme(isDark ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, fontsLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};