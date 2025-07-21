import { Bug, Circle } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { feedbackButtonPositionType } from '../types/types';
import { colors } from '../tokens/colors';

interface FloatingButtonProps {
  onPress: () => void;
  buttonPosition?: feedbackButtonPositionType;
  isRecording?: boolean;
}

const FloatingButton = ({
  onPress,
  buttonPosition,
  isRecording,
}: FloatingButtonProps) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          position: 'absolute',
          backgroundColor: isRecording ? colors.interactive.recording : colors.interactive.floating,
          padding: isRecording ? 16 : 20,
          borderRadius: isRecording ? 20 : 25,
          zIndex: 9999,
          ...buttonPosition,
        },
      }),
    [buttonPosition, isRecording],
  );

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {isRecording ? (
        <Circle size={24} color={colors.interactive.recording} fill={colors.interactive.recordingHover} />
      ) : (
        <Bug size={24} color={colors.text.muted} />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(FloatingButton);
