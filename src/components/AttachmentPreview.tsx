import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { X , Image as ImageIcon , Video as VideoIcon } from 'lucide-react-native';
import { generateThumbnail } from '../utils/generateThumbnail';
import { AttachmentStyles as styles } from '../Styles/AttachmentStyle';

interface AttachmentPreviewProps {
  screenshotUri?: string | null;
  recordingUri?: string | null;
  onRemoveScreenshot?: () => void;
  onRemoveRecording?: () => void;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  screenshotUri,
  recordingUri,
  onRemoveScreenshot,
  onRemoveRecording,
}) => {
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  useEffect(() => {
    const fetchThumbnail = async () => {
      if (recordingUri) {
        const response = await generateThumbnail(recordingUri);
        if (response) {
          setVideoThumbnail(response);
        }
      }
    };
    fetchThumbnail();
  }, [recordingUri]);

  const handleRemoveRecording = () =>{
    setVideoThumbnail(null);
    onRemoveRecording?.();
  }

  
  if (!screenshotUri && !recordingUri) return null;

  return (
    <View style={styles.previewContainer}>
      {screenshotUri && (
        <View style={styles.previewBox}>
          <View style={styles.previewTypeIcon}>
            <ImageIcon size={16} color={'#fff'} />
          </View>
          <Image
            source={{ uri: screenshotUri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.removeIcon}
            onPress={onRemoveScreenshot}
          >
            <X size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {videoThumbnail && (
        <View style={styles.previewBox}>
          <View style={styles.previewTypeIcon}>
            <VideoIcon size={16} color={'#fff'} />
          </View>
          <Image
            source={{ uri: videoThumbnail }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.removeIcon}
            onPress={handleRemoveRecording}
          >
            <X size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default React.memo(AttachmentPreview);
