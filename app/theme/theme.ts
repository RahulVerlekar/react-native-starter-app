import { ColorSchemeName } from 'react-native';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  error: string;
  success: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  surfaceTint: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  onBackground: string;
  onSurface: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
}

export interface Typography {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
    serif: string;
    serifItalic: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  typography: Typography;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

const typography: Typography = {
  fontFamily: {
    regular: 'DMSans-Regular',
    medium: 'DMSans-Medium',
    bold: 'DMSans-Bold',
    serif: 'DMSerifDisplay-Regular',
    serifItalic: 'DMSerifDisplay-Italic',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const lightColors: ThemeColors = {
  primary: '#5D5E5F',
  secondary: '#605E5E',
  background: '#FFFFFF', // Slightly brighter for better contrast
  card: '#F5F5F5', // Lighter for better separation
  text: '#121212', // Darker text for better readability
  border: '#747878', // outline
  notification: '#BA1A1A', // error
  error: '#D32F2F', // More vibrant red for better visibility
  success: '#2e7d32', // Slightly darker green for better readability
  onPrimary: '#FFFFFF',
  primaryContainer: '#E8E8E8', // Lighter container for better contrast
  onPrimaryContainer: '#393A3A', // Darker for better text contrast
  onSecondary: '#FFFFFF',
  secondaryContainer: '#B6B2B2', // Slightly darker for better visibility
  onSecondaryContainer: '#292727', // Darker for better readability
  tertiary: '#605E60',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#D9D5D7',
  onTertiaryContainer: '#5E5C5E',
  surfaceTint: '#5D5E5F',
  surfaceVariant: '#E0E3E3',
  onSurfaceVariant: '#3A3C3D', // Slightly darker for better readability
  outline: '#747878',
  onBackground: '#1C1B1B',
  onSurface: '#1C1B1B',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#93000A',
};

const darkColors: ThemeColors = {
  primary: '#F3F2F2',
  secondary: '#CAC5C5',
  background: '#121212', // Standard dark background
  card: '#1E1E1E', // Slightly lighter for better distinction
  text: '#F5F5F5', // Brighter text for better readability
  border: '#9E9E9E', // Lighter border for better visibility
  notification: '#FF8A80', // Brighter notification color
  error: '#FF5252', // More vibrant error color
  success: '#4CAF50',
  onPrimary: '#2F3131',
  primaryContainer: '#E0E0E0', // Brighter container color
  onPrimaryContainer: '#424444', // Darker for better contrast
  onSecondary: '#323030',
  secondaryContainer: '#B8B3B3', // Brighter for better visibility
  onSecondaryContainer: '#2A2828', // Darker for better contrast
  tertiary: '#F6F1F3',
  onTertiary: '#313032',
  tertiaryContainer: '#D9D5D7',
  onTertiaryContainer: '#5E5C5E',
  surfaceTint: '#C6C6C6',
  surfaceVariant: '#444748',
  onSurfaceVariant: '#DADADA', // Brighter for better dark mode visibility
  outline: '#8E9192',
  onBackground: '#E5E2E1',
  onSurface: '#E5E2E1',
  onError: '#690005',
  errorContainer: '#93000A',
  onErrorContainer: '#FFDAD6',
};

export const getTheme = (scheme: ColorSchemeName): Theme => ({
  dark: scheme === 'dark',
  colors: scheme === 'dark' ? darkColors : lightColors,
  typography,
  spacing,
});