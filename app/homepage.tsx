import { View } from "react-native";
import { useTheme } from "./theme/ThemeContext";
import { Typography } from "./components/Typography";
import { ThemeToggle } from "./components/ThemeToggle";

export default function HomePage() {
    const { theme } = useTheme();
    
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.background,
                padding: theme.spacing.md,
            }}
        >
            <Typography variant="h1">HomePage Screen</Typography>
            <ThemeToggle />
        </View>
    );
}
