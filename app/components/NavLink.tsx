import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface NavLinkProps {
  to: '/login' | '/homepage' | '/add-entry' | '/entry-details' | '/signup' | '/typography' | '/components';
  children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  const { theme } = useTheme();
  
  return (
    <Link 
      href={to} 
      style={[
        styles.link, 
        { 
          backgroundColor: theme.colors.primaryContainer, 
          color: theme.colors.onPrimaryContainer,
          borderColor: theme.colors.outline,
          textShadowColor: 'rgba(0, 0, 0, 0.1)', // Very subtle text shadow for better readability
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
        }
      ]}
    >
      {children}
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    marginVertical: 12, // Slightly more margin for better spacing
    fontSize: 18,
    padding: 12, // Slightly more padding for better touch targets
    borderWidth: 1,
    borderRadius: 8, // Slightly rounder corners
    textAlign: 'center',
    width: '100%',
    fontWeight: '500', // Medium weight for better readability
  }
});
