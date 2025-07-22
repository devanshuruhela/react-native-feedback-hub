import { createThumbnail } from 'react-native-create-thumbnail';

export const generateThumbnail = async (videoPath: string) => {
  try {
    const { path } = await createThumbnail({ url: videoPath });
    return path;
  } catch (err) {
    console.error('Thumbnail error:', err);
  }
};
