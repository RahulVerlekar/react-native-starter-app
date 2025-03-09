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
}

export interface Typography {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
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
    regular: 'System',
    medium: 'System',
    bold: 'System',
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
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ffffff',
  card: '#f8f8f8',
  text: '#333333',
  border: '#dddddd',
  notification: '#ff3b30',
  error: '#ff3b30',
  success: '#4cd964',
};

const darkColors: ThemeColors = {
  primary: '#62b3e5',
  secondary: '#4cd964',
  background: '#121212',
  card: '#1e1e1e',
  text: '#f8f8f8',
  border: '#333333',
  notification: '#ff453a',
  error: '#ff453a',
  success: '#32d74b',
};

export const getTheme = (scheme: ColorSchemeName): Theme => ({
  dark: scheme === 'dark',
  colors: scheme === 'dark' ? darkColors : lightColors,
  typography,
  spacing,
});