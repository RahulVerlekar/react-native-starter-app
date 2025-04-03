import { useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Body, Caption } from "./components/Typography";
import { SessionModel } from "./domain/models/session.model";
import { useApi } from "./network/useApi";
import { JournalEntryModel } from "./domain/models/journal-entry.model";
import { SafeAreaView } from "react-native-safe-area-context";
import Toolbar from "./components/NewToolbar";
import { sentimentScore } from "./utils/emotionClassifier";

type Tab = "entry" | "analysis";

export default function EntryDetails() {
    const [selectedTab, setSelectedTab] = useState<Tab>("entry");
    const { sessionId } = useLocalSearchParams<{
        sessionId: string
    }>();

    const { data: entries, error, loading, execute: fetchSessionEntries } = useApi<{ session: SessionModel, entries: JournalEntryModel[] }>(
        (client, sessionId) => client.getSessionDetails(sessionId),
        { immediate: false, onSuccess: (data) => console.log("data", data) },
    );

    useEffect(() => {
        console.log("sessionId", sessionId);
        if (sessionId) {
            fetchSessionEntries(sessionId)
        }
    }, [sessionId]);
    const router = useRouter();

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
            <View style={{ marginStart: 8, marginEnd: 8, marginBottom: 16 }}>
                <View style={styles.buttonBar}>
                    <TouchableOpacity
                        style={selectedTab === "entry" ? styles.selectedButton : styles.button}
                        onPress={() => setSelectedTab("entry")}
                    >
                        <Body style={selectedTab === "entry" ? styles.selectedButtonText : styles.buttonText}>Entry</Body>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={selectedTab === "analysis" ? styles.selectedButton : styles.button}
                        onPress={() => setSelectedTab("analysis")}
                    >
                        <Body style={selectedTab === "analysis" ? styles.selectedButtonText : styles.buttonText}>Analysis</Body>
                    </TouchableOpacity>
                </View>
            </View>
            {
                selectedTab === "entry" ? (
                    <View style={{ paddingStart: 16, paddingEnd: 16 }}>
                        <EntryTab entries={entries?.entries ?? []} />
                    </View>
                ) : (
                    <ScrollView style={{ paddingStart: 16, paddingEnd: 16 }}>
                        <AnalysisTab
                            title={"We Talked About"}
                            summary={entries?.session?.summaryTitle ?? ""}
                            insigts={entries?.session?.summary ?? ""}
                            Quotes={entries?.session?.quote ?? ""}
                            topics={entries?.session?.keywords.split(',') ?? []}
                            emotions={[]}
                            emotionScores={entries?.session?.emotion_score ?? {}}
                        />
                    </ScrollView>
                )}
        </SafeAreaView>
    );
}

type AnalysisTabProps = {
    title: string;
    summary: string;
    insigts: string;
    Quotes: string;
    topics: string[];
    emotions: string[];
    emotionScores: { [key: string]: number };
}

const AnalysisTab = ({ title, summary, insigts, Quotes, topics, emotions, emotionScores }: AnalysisTabProps) => {
    return (
        <ScrollView>
            <View>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.header}>{title}</Text>
                        <Text style={styles.subheader}>{summary}</Text>
                    </View>
                </View>
                <View style={{ height: 16 }} />
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.header}>Insights</Text>
                        <Text style={styles.subheader}>{insigts}</Text>
                    </View>
                </View>
                <View style={{ height: 16 }} />
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.header}>Quotes</Text>
                        <Text style={[styles.subheader, { justifyContent: "center", textAlign: "center" }]}>{Quotes}</Text>
                    </View>
                </View>
                <View style={{ height: 16 }} />
                <Text style={styles.header}>Topics</Text>
                <View style={styles.chipContainer}>
                    {topics.map((topic, index) => (
                        <View key={index} style={[styles.chip, { backgroundColor: "#9094FF1A", borderWidth: 1, borderColor: "#9094FF" }]}>
                            <Caption style={styles.chipText}>{topic.toLowerCase()}</Caption>
                        </View>
                    ))}
                </View>
                <View style={{ height: 16 }} />
                <Text style={styles.header}>Emotions</Text>
                <View style={styles.chipContainer}>
                    {Object.entries(emotionScores).map(([emotion, score], index) => (
                        <View key={index} style={[styles.chip,
                        (sentimentScore(emotion.toLowerCase()) == 1) && { backgroundColor: "#34C7591A", borderWidth: 1, borderColor: "#34C759" },
                        (sentimentScore(emotion.toLowerCase()) == 0) && { backgroundColor: "#FFCC001A", borderWidth: 1, borderColor: "#EABB00" },
                        (sentimentScore(emotion.toLowerCase()) == -1) && { backgroundColor: "#EA1B001A", borderWidth: 1, borderColor: "#EA1B00" }
                        ]}>
                            <Text style={[
                                styles.chipText,
                                (sentimentScore(emotion.toLowerCase()) == 1) && { color: "#34C759" },
                                (sentimentScore(emotion.toLowerCase()) == 0) && { color: "#EABB00" },
                                (sentimentScore(emotion.toLowerCase()) == -1) && { color: "#EA1B00" }
                            ]}>{`${emotion.toLowerCase()}: ${score}`}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

type EntryTabProps = {
    entries: JournalEntryModel[];
}
const EntryTab = ({ entries }: EntryTabProps) => {
    return (
        <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={styles.question}>{item.question?.question}</Text>
                            <Text style={styles.answer}>{item.entry}</Text>
                            <View style={{ height: 16 }} />
                        </View>
                    </View>
                </>
            )}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonBar: {
        width: '100%',
        flexDirection: 'row',
        paddingStart: 4,
        paddingEnd: 4,
        paddingVertical: 4,
        marginTop: 16,
        alignSelf: 'center',
        backgroundColor: '#F4F5F5',
        borderRadius: 8,
    },
    selectedButton: {
        flex: 1 / 2,
        backgroundColor: '#014E44',
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 8,
        height: 32,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1 / 2,
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 8,
        height: 32,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F5F5',
    },
    buttonText: {
        color: 'grey',
    },
    selectedButtonText: {
        color: 'white',
    },
    textContainer: {
        flex: 1,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        marginStart: 16,
    },
    chip: {
        backgroundColor: 'black',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    chipText: {
        color: '#4A50FF',
    },
    verticalLine: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
        marginTop: 16
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
    question: {
        color: "#333333",
        fontSize: 14,
        lineHeight: 21,
        fontWeight: "600",
        fontFamily: "DMSans-Regular",
    },
    answer: {
        color: "#333333",
        fontSize: 14,
        lineHeight: 21,
        fontWeight: "400",
        fontFamily: "DMSans-Regular",
        opacity: 0.8
    },
    toolbar: {
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        marginBottom: 8,
    },
    header: {
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "DMSans-Regular",
        color: "#333333",
    },
    subheader: {
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "DMSans-Regular",
        color: "#333333",
        opacity: 0.8,
        borderWidth: 1,
        borderColor: "#EAEAEA",
        padding: 16,
        borderRadius: 16,
        marginTop: 8,
    },
});