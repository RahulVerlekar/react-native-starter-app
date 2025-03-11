import { Link, router } from "expo-router";
import { Text, View, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Pressable } from "react-native";
import ToolbarHeader from "./components/ToolbarHeader";
import { Caption, H1, H2 } from "./components/Typography";
import { useTheme } from "./theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useApi } from "./network/useApi";
import { JournalEntryModel } from "./domain/models/journal-entry.model";
import { SessionModel } from "./domain/models/session.model";
import { useVoiceRecorder } from './hooks/useVoiceRecorder';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useVoicePlayback } from './hooks/useVoicePlayback';

export default function AddEntry() {

    const theme = useTheme()
    const [selectedEntry, setSelectedEntry] = useState<JournalEntryModel | null>(null);
    const [answer, setAnswer] = useState<string>("");
    const [handsfreeModeActive, setHandsfreeModeActive] = useState(false);

    const { data: created, error, loading, execute: fetchSessionEntries } = useApi<{ session: SessionModel, entries: JournalEntryModel[] }>(
        (client) => client.startNewSession("Morning Reflection"),
        { immediate: false }
    );

    const { execute: addAnswer } = useApi<JournalEntryModel>(
        (client, sessionId, entryId, answer) => client.addAnswer(sessionId, entryId, answer),
        { immediate: false }
    );

    const { execute: getNextQuestion } = useApi<{ session: SessionModel, entries: JournalEntryModel[] }>(
        (client, sessionId) => client.getNextQuestion(sessionId),
        { immediate: false }
    );

    const {
        isRecording,
        isTranscribing,
        error: recordingError,
        startRecording,
        stopRecordingAndTranscribe
    } = useVoiceRecorder();

    const {
        isPlaying,
        error: playbackError,
        playVoice,
        stopPlaying
    } = useVoicePlayback();

    useEffect(() => {
        const fetchEntries = async () => {
            const data = await fetchSessionEntries();
            setSelectedEntry(data.entries[0]);
            if (data.entries[0]?.question?.question) {
                await playVoice(data.entries[0].question.question);
            }
        };
        fetchEntries();
    }, []);

    const handleNextQuestion = async () => {
        if (selectedEntry && created?.session) {
            await addAnswer(created?.session.id, selectedEntry.id, answer);
            const data = await getNextQuestion(created?.session.id);
            setSelectedEntry(data.entries[data.entries.length - 1]);
            setAnswer("");

            const lastEntry = data.entries[data.entries.length - 1];
            if (lastEntry?.question?.question) {
                await playVoice(lastEntry.question.question);
            }
        }
    };

    const handleVoiceRecording = async () => {
        if (isRecording) {
            const transcription = await stopRecordingAndTranscribe();
            if (transcription) {
                setAnswer(transcription);
            }
        } else {
            setHandsfreeModeActive(true);
            await startRecording();
        }
    };

    const handleBackPress = () => {
        Alert.alert(
            "End Session",
            "This will end the conversation. You will not be able to restart it. Are you sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes, End Session",
                    onPress: () => router.back(),
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <H2 style={styles.title}>Journal Details</H2>
                    <View style={styles.toolbarButtons}>
                        <TouchableOpacity
                            onPress={handleVoiceRecording}
                            style={[
                                styles.micButton,
                                isRecording && styles.recording,
                                handsfreeModeActive && styles.handsfreeMode
                            ]}
                        >
                            <Ionicons
                                name={isRecording ? "stop-circle" : "mic"}
                                size={24}
                                color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={isPlaying ? stopPlaying : () => playVoice(selectedEntry?.question?.question || '')}
                            style={[styles.micButton, isPlaying && styles.playing]}
                        >
                            <Ionicons
                                name={isPlaying ? "stop" : "play"}
                                size={24}
                                color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                            />
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={handleBackPress}>
                            <MaterialIcons name="close" size={24} color='black' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.qnaIndicator}>
                        {recordingError && <Caption style={styles.error}>{recordingError}</Caption>}
                        {playbackError && <Caption style={styles.error}>{playbackError}</Caption>}
                        {isTranscribing && <Caption>Transcribing...</Caption>}
                        {isPlaying && <Caption>Playing question...</Caption>}
                    </View>
                    <View style={styles.qnaContainer}>
                        <View style={styles.questionContainer}>
                            <H2>{selectedEntry?.question?.question ?? ""}</H2>
                        </View>
                        <View style={styles.answerContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder={selectedEntry?.question?.hint ?? ""}
                                    value={answer}
                                    onChangeText={setAnswer}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{alignSelf: 'flex-end'}}>
                            <Button
                                title="Next Question"
                                onPress={handleNextQuestion}
                                color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    input: {
        flex: 1,
    },
    micButton: {
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#00000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recording: {
        backgroundColor: '#ff0000',
    },
    error: {
        color: '#ff4444',
        marginBottom: 10,
    },
    playing: {
        backgroundColor: '#4444ff',
    },
    handsfreeMode: {
        backgroundColor: '#fff4444',
    },
    title: {
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginStart: 16,
        marginTop: 16,
        marginEnd: 16,
    },
    toolbarButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
