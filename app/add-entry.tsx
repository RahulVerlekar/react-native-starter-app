import { Link } from "expo-router";
import { Text, View, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import ToolbarHeader from "./components/ToolbarHeader";
import { Caption, H1, H2 } from "./components/Typography";
import { useTheme } from "./theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useApi } from "./network/useApi";
import { JournalEntryModel } from "./domain/models/journal-entry.model";
import { SessionModel } from "./domain/models/session.model";

export default function AddEntry() {

    const theme = useTheme()
    const [selectedEntry, setSelectedEntry] = useState<JournalEntryModel | null>(null);
    const [answer, setAnswer] = useState<string>("");

    const { data: created, error, loading, execute: fetchSessionEntries } = useApi<{ session: SessionModel, entries: JournalEntryModel[] }>(
        (client) => client.startNewSession("Morning Reflection"),
        { immediate: false }
    );

    const { execute: addAnswer } = useApi<JournalEntryModel>(
        (client, sessionId, entryId, answer) => client.addAnswer(sessionId, entryId, answer),
        { immediate: false }
    );

    const { execute: getNextQuestion } = useApi<{session: SessionModel, entries: JournalEntryModel[]}>(
        (client, sessionId) => client.getNextQuestion(sessionId),
        { immediate: false }
    );

    useEffect(() => {
        const fetchEntries = async () => {
            const data = await fetchSessionEntries();
            setSelectedEntry(data.entries[0]);
        };
        fetchEntries();
    }, []);

    const handleNextQuestion = async () => {
        console.log("selectedEntry", selectedEntry);
        if (selectedEntry && created?.session) {
            await addAnswer(created?.session.id, selectedEntry.id, answer);
            const data = await getNextQuestion(created?.session.id);
            setSelectedEntry(data.entries[data.entries.length - 1]);
            setAnswer("");
        }
    };

    return (
        <>
            <View style={sty.container}>
                <ToolbarHeader title="Add Entry" />
                <View style={sty.contentContainer}>
                    <View style={sty.qnaIndicator}>

                    </View>
                    <View style={sty.qnaContainer}>
                        <View style={sty.questionContainer}>
                            <H2>{selectedEntry?.question?.question ?? ""}</H2>
                        </View>
                        <View style={sty.answerContainer}>
                            <TextInput
                                style={[{ fontSize: theme.theme.typography.fontSize.xl }]}
                                placeholder={selectedEntry?.question?.hint ?? ""}
                                value={answer}
                                onChangeText={setAnswer}
                                multiline
                            />
                        </View>
                    </View>
                    <View style={sty.bottomContainer}>
                        <Button
                            title="Next Question"
                            onPress={handleNextQuestion}
                            color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                        />
                        <Button
                            title="End Session"
                            onPress={() => {

                            }}
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
