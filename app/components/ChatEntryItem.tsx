import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface ChatEntryItemProps {
    question: string;
    hint: string;
    answer: string;
    disableInput?: boolean;
    onChangeText: (text: string) => void;
}

const ChatEntryItem: React.FC<ChatEntryItemProps> = ({ question, hint, answer, disableInput = false, onChangeText }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.hint}>{hint}</Text>
            {disableInput ? (
                <Text style={styles.question}>{answer}</Text>
            ) : (
                <TextInput
                    style={[styles.input, disableInput && styles.disabledInput]}
                    value={answer}
                    onChangeText={onChangeText}
                    editable={!disableInput}
                    placeholder="Enter your answer"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    hint: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        backgroundColor: '#F4F4F4',
        borderRadius: 16,
        textAlign: 'right',
        marginStart: 24
    },
    answer: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
    },
});

export default ChatEntryItem;