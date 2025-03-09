import { Link } from "expo-router";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import ToolbarHeader from "./components/ToolbarHeader";
import { H1 } from "./components/Typography";
import { useTheme } from "./theme/ThemeContext";

const title = "How did today go for you? Were there any moments that stood out or any challenges you faced?"
const hint = "Write about your day here..."

export default function AddEntry() {

    const theme = useTheme()

    return (
        <View style={styles.container}>
            {/* Toolbar */}
            <ToolbarHeader title="Add Entry" />

            <View style={styles.content}>
                <H1 style={styles.title}>{title}</H1>
                <TextInput
                    style={[styles.bodyText, { fontSize: theme.theme.typography.fontSize.xl }]}
                    placeholder="Body text goes here."
                    multiline
                />
            </View>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                <Button title="Previous" onPress={() => { /* Previous action */ }} />
                <Button title="Next" onPress={() => { /* Next action */ }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    content: {
        alignItems: "center",
    },
    title: {
        paddingStart: 16,
        paddingTop: 16,
    },
    bodyText: {
        width: "100%",
        marginVertical: 10,
        marginStart: 56,
        marginEnd: 10,
        borderWidth: 1,
        height:"100%",
        textAlignVertical: "top",
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        bottom: 0,
        position: "absolute",
        marginBottom: 16,
        paddingStart: 16,
        paddingEnd: 16
    },
});
