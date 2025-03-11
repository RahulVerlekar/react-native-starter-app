import * as Speech from 'expo-speech';
import { useState, useEffect } from 'react';

export const useVoicePlayback = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            Speech.stop();
        };
    }, []);

    const playVoice = async (text: string) => {
        try {
            if (isPlaying) {
                await stopPlaying();
            }
            
            setIsPlaying(true);
            await Speech.speak(text, {
                onDone: () => setIsPlaying(false),
                onError: (error) => {
                    setError(error.message);
                    setIsPlaying(false);
                }
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to play speech');
            setIsPlaying(false);
        }
    };

    const stopPlaying = async () => {
        await Speech.stop();
        setIsPlaying(false);
    };

    return {
        isPlaying,
        error,
        playVoice,
        stopPlaying
    };
};
