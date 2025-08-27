import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { XIcon, ImageIcon, VideoIcon } from '../svgs';
import { generateThumbnail } from '../utils/generateThumbnail';
import { AttachmentStyles as styles } from '../Styles/AttachmentStyle';
import { colors } from '../tokens/colors';

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

  const handleRemoveRecording = () => {
    setVideoThumbnail(null);
    onRemoveRecording?.();
  };

  if (!screenshotUri && !recordingUri) return null;

  return (
    <View style={styles.previewContainer}>
      {screenshotUri && (
        <View style={styles.previewBox}>
          <View style={styles.previewTypeIcon}>
            <ImageIcon size={16} color={colors.text.white} />
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
            <XIcon size={16} color={colors.text.white} />
          </TouchableOpacity>
        </View>
      )}

      {videoThumbnail && (
        <View style={styles.previewBox}>
          <View style={styles.previewTypeIcon}>
            <VideoIcon size={16} color={colors.text.white} />
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
            <XIcon size={16} color={colors.text.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default React.memo(AttachmentPreview);
