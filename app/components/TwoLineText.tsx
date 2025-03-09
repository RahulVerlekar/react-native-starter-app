import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Caption, H2, Body } from './Typography';

interface StackedTextProps {
    title: string;
    body: string;
    onClick?: (param?: any) => void;
    param?: any;
    hideVerticalLine?: boolean;
}

export default function TwoLineText({ title, body, onClick, param, hideVerticalLine = false }: StackedTextProps) {
    return (
        <TouchableOpacity onPress={() => onClick && onClick(param)}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <H2>{title}</H2>
                    <Body>{body}</Body>
                    {!hideVerticalLine && <View style={styles.verticalLine} />}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    textContainer: {
        flex: 1,
    },
    verticalLine: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
        marginTop: 16
    },
});
