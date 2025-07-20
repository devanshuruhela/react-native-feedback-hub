import { createThumbnail } from 'react-native-create-thumbnail';

export const generateThumbnail = async (videoPath: string) => {
  try {
    const fileUri = `file://${videoPath}`;
    const { path } = await createThumbnail({ url: fileUri });
    return path;
  } catch (err) {
    console.error('Thumbnail error:', err);
  }
};
