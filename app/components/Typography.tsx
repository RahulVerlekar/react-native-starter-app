import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface TypographyProps extends TextProps {
  variant?: 'display' | 'h1' | 'h2' | 'paragraph' | 'button' | 'h3' | 'h4' | 'body' | 'caption';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getTypographyStyle = () => {
    const { typography, colors } = theme;

    switch (variant) {
      case 'display':
        return {
          fontFamily: typography.fontFamily.regular,
          fontSize: 24,
          color: '#1A3234',
          lineHeight: 24,
          fontWeight: '600',
        };
      case 'h1':
        return {
          fontFamily: typography.fontFamily.regular,
          fontSize: 18,
          color: '#333333',
          lineHeight: 18,
          // fontWeight: '700',
        };
      case 'h2':
        return {
          fontFamily: typography.fontFamily.regular,
          fontSize: 16,
          color: "#333333",
          lineHeight: 16,
          // fontWeight: '700',
        };
      case 'h3':
        return {
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.fontSize.lg,
          color: colors.onBackground,
        };
      case 'h4':
        return {
          fontFamily: typography.fontFamily.medium,
          fontSize: typography.fontSize.md,
          color: colors.onBackground,
        };
      case 'caption':
        return {
          fontFamily: typography.fontFamily.regular,
          fontSize: typography.fontSize.xs,
          color: colors.onSurfaceVariant,
          letterSpacing: 0.4, // Slightly looser for small text
        };
      case 'paragraph':
        return {
          fontFamily: typography.fontFamily.regular,
          fontSize: 14,
          color: '#333333',
          // fontWeight: '300',
          letterSpacing: 0.4, // Slightly looser for small text
        };
      case 'button':
        return {
          fontFamily: typography.fontFamily.regular,
          fontSize: 14,
          color: '#333333',
          // fontWeight: '600',
          letterSpacing: 0.4, // Slightly looser for small text
        };
      default:
        return {
          fontFamily: typography.fontFamily.regular,
          fontSize: typography.fontSize.md,
          color: colors.onBackground,
          lineHeight: typography.fontSize.md * 1.5, // Better line height for readability
        };
    }
  };

  return (
    <Text style={[getTypographyStyle(), style]} {...props}>
      {children}
    </Text>
  );
};

export const H1 = (props: TextProps) => <Typography variant="h1" {...props} />;
export const H2 = (props: TextProps) => <Typography variant="h2" {...props} />;
export const H3 = (props: TextProps) => <Typography variant="h3" {...props} />;
export const H4 = (props: TextProps) => <Typography variant="h4" {...props} />;
export const Body = (props: TextProps) => <Typography variant="body" {...props} />;
export const Caption = (props: TextProps) => <Typography variant="caption" {...props} />;