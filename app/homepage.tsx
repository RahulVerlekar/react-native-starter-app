import { View, StyleSheet } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { H1, H2, Body } from "./components/Typography";
import { ThemeToggle } from "./components/ThemeToggle";
import { NavLink } from "./components/NavLink";

export default function HomePage() {
    const { theme } = useTheme();
    
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
                padding: theme.spacing.md,
            }}
        >
            <View style={styles.header}>
                <H1>HomePage Screen</H1>
                <Body style={styles.subtitle}>Welcome to the React Native Starter App</Body>
            </View>

            <View style={styles.themeToggleContainer}>
                <Body style={styles.themeLabel}>Toggle Theme:</Body>
                <ThemeToggle />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    subtitle: {
        marginTop: 8,
    },
    section: {
        marginBottom: 24,
    },
    links: {
        marginTop: 16,
    },
    link: {
        marginBottom: 16,
    },
    themeToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    themeLabel: {
        marginRight: 12,
    }
});
