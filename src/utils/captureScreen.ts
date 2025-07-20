import { captureScreen as rnCaptureScreen } from 'react-native-view-shot';
export default async function captureScreen(): Promise<string | null> {
  try {
    const uri = await rnCaptureScreen({ format: 'png', quality: 0.8 });
    return uri;
  } catch (err) {
    console.warn('Screenshot failed', err);
    return null;
  }
}