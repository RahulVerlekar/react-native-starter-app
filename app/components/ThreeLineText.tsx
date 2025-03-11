import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Caption, H2, Body, H3 } from './Typography';

interface StackedTextProps {
    caption: string;
    title: string;
    body: string;
    onClick?: (param?: any) => void;
    param?: any;
}

export default function ThreeLineText({ caption, title, body, onClick, param }: StackedTextProps) {
    return (
        <TouchableOpacity onPress={() => onClick && onClick(param)}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Caption>{caption}</Caption>
                    <H3>{title}</H3>
                    <Body>{body}</Body>
                    <View style={styles.verticalLine} />
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
