import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TextStyle, ViewStyle, Alert } from 'react-native';

interface EditTextProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    secureTextEntry?: boolean;
}

const EditText: React.FC<EditTextProps> = ({
    label,
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default',
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = isFocused ? '#014E44' : '#D1D1D1';

    return (
        <View style={[styles.container, { borderColor }]}>
            {value || isFocused ? (
                <Text style={[styles.label, {color: borderColor}]}>{label}</Text>
            ) : null}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#333333"
                keyboardType={keyboardType}
                value={value}
                secureTextEntry
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
        paddingVertical: 10
    } as ViewStyle,
    label: {
        textAlign: 'left',
        width: '100%',
        paddingStart: 4,
        fontSize: 12,
        fontFamily: 'DMSans-Regular',
        fontWeight: '500',
    } as TextStyle,
    input: {
        borderColor: '#00000000',
        color: '#333333',
        paddingBottom: 4,
        paddingStart: 4,
        paddingTop: 4,
        fontSize: 14,
    } as TextStyle,
});

export default EditText;