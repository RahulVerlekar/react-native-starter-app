import { Link } from "expo-router";
import { Text, View, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ToolbarHeader from "./components/ToolbarHeader";
import { Caption, H1, H2 } from "./components/Typography";
import { useTheme } from "./theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useApi } from "./network/useApi";
import { JournalEntryModel } from "./domain/models/journal-entry.model";
import { SessionModel } from "./domain/models/session.model";
import { useVoiceRecorder } from './hooks/useVoiceRecorder';
import { Ionicons } from '@expo/vector-icons';
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

    const { execute: getNextQuestion } = useApi<{session: SessionModel, entries: JournalEntryModel[]}>(
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

    return (
        <>
            <View style={styles.container}>
                <ToolbarHeader title="Add Entry" />
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
                        <TouchableOpacity 
                            onPress={isPlaying ? stopPlaying : () => playVoice(selectedEntry?.question?.question || '')}
                            style={[styles.micButton, isPlaying && styles.playing]}
                        >
                            <Ionicons 
                                name={isPlaying ? "stop" : "play"} 
                                size={24} 
                                color={theme.theme.dark ? "#FFFFFF" : "#000000"} 
                            />
                        </TouchableOpacity>
                        <Button
                            title="Next Question"
                            onPress={handleNextQuestion}
                            color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                        />
                        <Button
                            title="End Session"
                            onPress={() => {}}
                            color={theme.theme.dark ? "#FFFFFF" : "#000000"}
                        />
                    </View>
                </View>
            </View>
        </>
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
        height: 68,
        flexDirection: "row",
        justifyContent: "space-around",
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
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recording: {
        backgroundColor: '#ff4444',
    },
    error: {
        color: '#ff4444',
        marginBottom: 10,
    },
    playing: {
        backgroundColor: '#4444ff',
    },
    handsfreeMode: {
        backgroundColor: '#44ff44',
    },
});
