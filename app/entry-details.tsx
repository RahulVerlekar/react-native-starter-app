import { Link } from "expo-router";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ToolbarHeader from "./components/ToolbarHeader";
import { useState } from "react";
import { Body, Caption, H3 } from "./components/Typography";
import TwoLineText from "./components/TwoLineText";

type Tab = "entry" | "analysis";

export default function EntryDetails() {
    const [selectedTab, setSelectedTab] = useState<Tab>("entry");

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
                    <EntryTab /> :
                    <AnalysisTab
                        title="Analysis Title"
                        summary="Analysis Summary"
                        insigts="Analysis Insights"
                        Quotes="Analysis Quotes"
                        topics={["Topic 1", "Topic 2"]}
                        emotions={["Emotion 1", "Emotion 2"]}
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
}
const AnalysisTab = ({ title, summary, insigts, Quotes, topics, emotions }: AnalysisTabProps) => {
    return (
        <View>
            <Text>Analysis Tab</Text>
            <TwoLineText title={title} body={summary} />
            <TwoLineText title="Insights" body={insigts} />
            <TwoLineText title="Quotes" body={Quotes} />
            <TwoLineText title="Topics" body={topics.join(", ")} />
            <TwoLineText title="Emotions" body={emotions.join(", ")} hideVerticalLine={true} />
        </View>
    );
}


type EntryTabProps = {
    title: string;
    summary: string;
    insigts: string;
    Quotes: string;
    topics: string[];
    emotions: string[];
}
const EntryTab = () => {
    return (
        <View>
            <Text>Entry Tab</Text>
        </View>
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
});