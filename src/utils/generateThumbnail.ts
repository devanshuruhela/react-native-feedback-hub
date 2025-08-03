import { Platform } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';

export const generateThumbnail = async (videoPath: string) => {

  if(!videoPath){
    return;
  }

  const uri = Platform.select({
    ios: videoPath.replace(/^file:\/\/file:\/\//, ''),
    android: videoPath,
  });

  if (!uri) {
    return;
  }
  
  try {
    const { path } = await createThumbnail({ url: uri });
    return path;
  } catch (err) {
    console.error('Thumbnail error:', err);
  }
};
