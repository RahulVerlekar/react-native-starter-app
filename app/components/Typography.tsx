import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
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
      case 'h1':
        return {
          fontFamily: typography.fontFamily.serif,
          fontSize: typography.fontSize.xxl,
          color: colors.onBackground,
          lineHeight: typography.fontSize.xxl + 1
        };
      case 'h2':
        return {
          fontFamily: typography.fontFamily.serif,
          fontSize: typography.fontSize.xl,
          color: colors.onBackground,
          lineHeight: typography.fontSize.xxl
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