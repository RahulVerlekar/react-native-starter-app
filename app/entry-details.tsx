import { useRouter, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import ToolbarHeader from "./components/ToolbarHeader";
import { useEffect, useState } from "react";
import { Body, Caption, H2, H3 } from "./components/Typography";
import TwoLineText from "./components/TwoLineText";
import { SessionModel } from "./domain/models/session.model";
import { useApi } from "./network/useApi";
import { JournalEntryModel } from "./domain/models/journal-entry.model";

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

    return (
        <View style={styles.container}>
            <ToolbarHeader title="Entry Details" />
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
            {
                selectedTab === "entry" ?
                    <EntryTab entries={entries?.entries ?? []} /> :
                    <AnalysisTab
                        title={entries?.session?.frameworkTitle ?? ""}
                        summary={entries?.session?.summaryTitle ?? ""}
                        insigts={entries?.session?.summary ?? ""}
                        Quotes={entries?.session?.quote ?? ""}
                        topics={entries?.session?.keywords.split(',') ?? []}
                        emotions={[]}
                        emotionScores={entries?.session?.emotion_score ?? {}}
                    />}
        </View>
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
                <TwoLineText title={title} body={summary} />
                <TwoLineText title="Insights" body={insigts} />
                <TwoLineText title="Quotes" body={Quotes} />
                <H2>Topics</H2>
                <View style={styles.chipContainer}>
                    {topics.map((topic, index) => (
                        <View key={index} style={styles.chip}>
                            <Caption style={styles.chipText}>{topic.toLowerCase()}</Caption>
                        </View>
                    ))}
                </View>
                <View style={styles.verticalLine} />
                <H2>Emotions</H2>
                <View style={styles.chipContainer}>
                    {Object.entries(emotionScores).map(([emotion, score], index) => (
                        <View key={index} style={styles.chip}>
                            <Caption style={styles.chipText}>{`${emotion.toLowerCase()}: ${score}`}</Caption>
                        </View>
                    ))}
                </View>
                <View style={styles.verticalLine} />
            </View>
        </ScrollView>
    );
}

type EntryTabProps = {
    entries: JournalEntryModel[];
}
const EntryTab = ({ entries }: EntryTabProps) => {
    console.log("entries", entries);
    return (
        <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TwoLineText
                    title={item.question?.question ?? ""}
                    body={item.entry}
                    hideVerticalLine={true}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonBar: {
        flexDirection: 'row',
        padding: 16,
    },
    selectedButton: {
        backgroundColor: 'black',
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 32,
        height: 48,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'transparent',
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 32,
        height: 48,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: 'white',
    },
    verticalLine: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
        marginTop: 16
    },
});