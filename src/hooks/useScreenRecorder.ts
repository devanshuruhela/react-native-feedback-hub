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

  const start = async (): Promise<string | null> => {
    const res = await RecordScreen.startRecording({ mic: false});
    console.log(res);
    if (res === RecordingResult.PermissionError) {
      return null;
    }
    return res;
  };

  const stop = async (): Promise<string | null> => {
    const res = (await RecordScreen.stopRecording()) as StopRecordingResult;
    if (res && res.result?.outputURL) {
      setVideoUri(res.result.outputURL);
      RecordScreen.clean();
      return res.result.outputURL;
    }
    return null;
  };

  return { start, stop, videoUri, setVideoUri };
}
