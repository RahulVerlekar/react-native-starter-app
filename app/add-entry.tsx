import { Link } from "expo-router";
import { Text, View, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import ToolbarHeader from "./components/ToolbarHeader";
import { Caption, H1, H2 } from "./components/Typography";
import { useTheme } from "./theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useApi } from "./network/useApi";
import { JournalEntryModel } from "./domain/models/journal-entry.model";

const title = "How did today go for you? Were there any moments that stood out or any challenges you faced?"
const hint = "Write about your day here..."

export default function AddEntry() {

    const theme = useTheme()
    const sessionId = "374852c0-a7b6-455b-a706-2cf62bd3fea9"
    const [selectedEntry, setSelectedEntry] = useState<JournalEntryModel | null>(null);

    const { data: entries, error, loading, execute: fetchSessionEntries } = useApi<JournalEntryModel[]>(
        (client, sessionId) => client.getSessionEntries(sessionId),
        { immediate: false }
    );

    useEffect(() => {
        const fetchEntries = async () => {
            console.log("sessionId", sessionId);
            if (sessionId) {
                const entries = await fetchSessionEntries(sessionId);
                setSelectedEntry(entries[0]);
            }
        };
        fetchEntries();
    }, [sessionId]);


    return (
        <>
            <View style={sty.container}>
                <ToolbarHeader title="Add Entry" />
                <View style={sty.contentContainer}>
                    <View style={sty.qnaIndicator}>
                        <Caption>{entries ? `${entries.findIndex(entry => entry.id === selectedEntry?.id) + 1}/${entries.length}` : "0/0"}</Caption>
                    </View>
                    <View style={sty.qnaContainer}>
                        <View style={sty.questionContainer}>
                            <H2>{selectedEntry?.question?.question ?? ""}</H2>
                        </View>
                        <View style={sty.answerContainer}>
                            <TextInput
                                style={[{ fontSize: theme.theme.typography.fontSize.xl }]}
                                placeholder={selectedEntry?.question?.hint ?? ""}
                                multiline
                            />
                        </View>
                    </View>
                    <View style={sty.bottomContainer}>
                        <Button
                            title="Previous"
                            onPress={() => {
                                if (selectedEntry && entries) {
                                    const currentIndex = entries.findIndex(entry => entry.id === selectedEntry.id);
                                    if (currentIndex > 0) {
                                        setSelectedEntry(entries[currentIndex - 1]);
                                    }
                                }
                            }}
                            disabled={!selectedEntry || (entries && entries.findIndex(entry => entry.id === selectedEntry.id) === 0)}
                            color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                        />
                        <Button
                            title="Next"
                            onPress={() => {
                                if (selectedEntry && entries) {
                                    const currentIndex = entries.findIndex(entry => entry.id === selectedEntry.id);
                                    if (currentIndex < entries.length - 1) {
                                        setSelectedEntry(entries[currentIndex + 1]);
                                    }
                                }
                            }}
                            disabled={!selectedEntry || (entries && entries.findIndex(entry => entry.id === selectedEntry.id) === entries.length - 1)}
                            color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

const sty = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
    },
    toolbar: {

    },
    contentContainer: {
        padding: 16,
        flexGrow: 1,
    },
    qnaContainer: {
        flexGrow: 1,
    },
    bottomContainer: {
        height: 68,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    questionContainer: {

    },
    answerContainer: {
        flex: 1,
    },
    qnaIndicator: {
        alignItems: "center",
        justifyContent: "center",
    },
});

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
        height: "100%",
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
