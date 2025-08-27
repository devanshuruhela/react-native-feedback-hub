import { BugIcon, CircleFilled } from '../svgs';
import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FeedbackButtonPositionType } from '../types/types';
import { colors } from '../tokens/colors';

interface FloatingButtonProps {
  onPress: () => void;
  buttonPosition?: FeedbackButtonPositionType;
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
        <CircleFilled size={24} color={colors.interactive.recordingHover} />
      ) : (
        <BugIcon size={24} color={colors.text.muted} />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(FloatingButton);
