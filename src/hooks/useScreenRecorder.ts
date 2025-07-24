import { useState } from 'react';
import RecordScreen, { RecordingResult } from 'react-native-record-screen';
type StopRecordingResult = {
  result?: {
    outputURL?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export function useScreenRecorder() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  const start = async (): Promise<string | null> => {
    const res = await RecordScreen.startRecording({ mic: false, fps: 24, bitrate: 1024000 });
    if (res === RecordingResult.PermissionError) {
      return null;
    }
    return res;
  };

  const stop = async (): Promise<string | null> => {
    const res = (await RecordScreen.stopRecording()) as StopRecordingResult;
    if (res && res.result?.outputURL) {
      const filePath = `file://${res.result.outputURL}`;
      setVideoUri(filePath);
      setFilePath(res.result.outputURL); 
      return filePath;
    }
    return null;
  };

  const cleanup = async () => {
    try {
      if (filePath) {
        await RecordScreen.clean(); 
        const fs = require('react-native-fs');
        const fileExists = await fs.exists(filePath);
        if (fileExists) {
          await fs.unlink(filePath); 
        }
      }
    } catch (error) {
      console.warn('Error cleaning up recording:', error);
    } finally {
      setVideoUri(null);
      setFilePath(null);
    }
  };

  return { start, stop, videoUri, setVideoUri, cleanup };
}
