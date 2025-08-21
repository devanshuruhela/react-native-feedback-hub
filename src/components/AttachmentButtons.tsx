import { Text, TouchableOpacity, View } from 'react-native';
import { ModalStyles as styles } from '../Styles/ModalStyle';
import { colors } from '../tokens/colors';
import { Camera, Square, Video } from 'lucide-react-native';
import { memo } from 'react';

const Attachments = ({
  isScreenShotEnabled,
  isScreenRecordingEnabled,
  isRecording,
  handleCapture,
  handleRecording,
}: {
  isScreenShotEnabled?: boolean;
  isScreenRecordingEnabled?: boolean;
  isRecording: boolean;
  handleCapture: () => void;
  handleRecording: () => void;
}) => (
  <View style={styles.attachments}>
    {isScreenShotEnabled && (
      <TouchableOpacity style={styles.attachmentButton} onPress={handleCapture}>
        <Camera size={16} color={colors.text.muted} />
        <Text style={styles.attachmentText}> Screenshot</Text>
      </TouchableOpacity>
    )}
    {isScreenRecordingEnabled && (
      <TouchableOpacity
        style={[styles.attachmentButton, isRecording && styles.recording]}
        onPress={handleRecording}
      >
        {isRecording ? (
          <Square size={16} color={colors.status.error.text} />
        ) : (
          <Video size={16} color={colors.text.muted} />
        )}
        <Text
          style={[styles.attachmentText, isRecording && styles.recordingText]}
        >
          {isRecording ? ' Stop Recording' : ' Record Screen'}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

export default memo(Attachments);
