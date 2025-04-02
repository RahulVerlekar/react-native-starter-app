import { Link, router } from "expo-router";
import { Text, View, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Pressable, FlatList } from "react-native";
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
import Toolbar from "./components/NewToolbar";
import ChatEntryItem from "./components/ChatEntryItem";

export default function AddEntryMultiQuestion() {

    const theme = useTheme()
    const [entries, setEntries] = useState<JournalEntryModel[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<JournalEntryModel | null>(null);
    const [answer, setAnswer] = useState<string>("");
    const [handsfreeModeActive, setHandsfreeModeActive] = useState(false);

    const today = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const { data: created, error, loading, execute: fetchSessionEntries } = useApi<{ session: SessionModel, entries: JournalEntryModel[] }>(
        (client) => client.getSessionDetails("e397b03c-17e4-4a04-a872-c2f185c8db63"),
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
            setEntries(data.entries);
            const entry = data.entries[data.entries.length - 1];
            setSelectedEntry(entry);
            if (entry.question?.question) {
                await playVoice(entry.question.question);
            }
        };
        fetchEntries();
    }, []);

    const handleNextQuestion = async () => {
        if (selectedEntry && created?.session) {
            await addAnswer(created?.session.id, selectedEntry.id, answer);
            const data = await getNextQuestion(created?.session.id);
            setEntries(data.entries);
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
            <View style={styles.toolbar}>
                <Toolbar
                    title="Entry Details"
                    hasBack={true}
                    onBackPress={() => {
                        router.dismiss()
                    }}
                />
            </View>
            <Text style={styles.dateText}>{today}</Text>
            <View style={{ flex: 1 }}>
                <View style={styles.contentContainer}>
                    <View style={styles.qnaIndicator}>
                        {recordingError && <Caption style={styles.error}>{recordingError}</Caption>}
                        {playbackError && <Caption style={styles.error}>{playbackError}</Caption>}
                        {isTranscribing && <Caption>Transcribing...</Caption>}
                        {isPlaying && <Caption>Playing question...</Caption>}
                    </View>
                    <View style={styles.qnaContainer}>
                        <FlatList
                            style={{ flex: 1 }}
                            data={entries}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <>
                                    <View style={styles.container}>
                                        <ChatEntryItem
                                            question={item.question?.question ?? ""}
                                            hint={item.question?.hint ?? ""}
                                            answer={selectedEntry?.id != item.id ? item.entry : answer}
                                            disableInput={selectedEntry?.id != item.id}
                                            onChangeText={() => {
                                                if(selectedEntry?.id == item.id) {
                                                    setAnswer(item.entry)
                                                }
                                            }} />
                                    </View>
                                </>
                            )}
                        />
                        {/* <View style={styles.questionContainer}>
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
                        </View> */}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    {(!isRecording && !isPlaying) && (
                        <TouchableOpacity onPress={handleVoiceRecording} style={{ height: 48, width: 48, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="mic-circle-outline" size={48} color="#014E44" />
                        </TouchableOpacity>
                    )}
                    {isPlaying && (
                        <TouchableOpacity onPress={stopPlaying} style={{ height: 48, width: 48, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="stop-circle-outline" size={48} color="#014E44" />
                        </TouchableOpacity>
                    )}
                    {isRecording && (
                        <TouchableOpacity onPress={handleVoiceRecording} style={{ height: 48, width: 48, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="stop-circle-outline" size={48} color="#014E44" />
                        </TouchableOpacity>
                    )}
                    <View style={{ flex: 1 }} />
                    <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={handleNextQuestion}
                            style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>
                                Next Question
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleBackPress}
                            style={styles.endButton}>
                            <Text style={styles.endButtonText}>
                                End Session
                            </Text>
                        </TouchableOpacity>
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
        height: 70,
        paddingStart: 16,
        paddingEnd: 16,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 1
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
    nextButton: {
        backgroundColor: "#014E44",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
        alignItems: "center",
    },
    endButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#014E44",
    },
    nextButtonText: {
        fontFamily: "DM Sans",
        fontWeight: "700",
        fontSize: 12,
        letterSpacing: 0,
        color: "#fff",
        textAlign: "center",
    },
    endButtonText: {
        fontFamily: "DM Sans",
        fontWeight: "700",
        fontSize: 12,
        letterSpacing: 0,
        color: "#014E44",
        textAlign: "center"
    },
    dateText: {
        marginTop: 16,
        marginStart: 16,
        color: "#666666",
        fontSize: 12,
        fontWeight: "600",
        fontFamily: "DMSans-Regular",
    }
});
