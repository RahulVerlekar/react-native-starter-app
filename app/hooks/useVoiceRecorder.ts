import { useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { GROQ_API_KEY } from '@env';

export const useVoiceRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        setError("Permission to access microphone is required!");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError("Failed to start recording: " + err);
    }
  };

  const stopRecordingAndTranscribe = async (): Promise<string> => {
    try {
      setIsRecording(false);
      if (!recording) return "";

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (!uri) throw new Error("Failed to record audio.");

      setIsTranscribing(true);
      const transcription = await transcribeAudio(uri);
      return transcription;
    } catch (err) {
      setError("Failed to stop recording: " + err);
      return "";
    } finally {
      setIsTranscribing(false);
    }
  };

  const transcribeAudio = async (filePath: string): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: filePath,
        name: "recorded_audio.m4a",
        type: "audio/m4a",
      });
      formData.append("model", "whisper-large-v3-turbo");
      formData.append("response_format", "json");

      const response = await fetch(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.text || "";
    } catch (err) {
      setError("Error during transcription: " + err);
      return "";
    }
  };

  return {
    isRecording,
    isTranscribing,
    error,
    startRecording,
    stopRecordingAndTranscribe,
  };
};
