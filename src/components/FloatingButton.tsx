import { Bug, Circle } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { feedbackButtonPositionType} from '../types/types';

interface FloatingButtonProps {
  onPress: () => void;
  buttonPosition?: feedbackButtonPositionType
  isRecording?: boolean
}

const FloatingButton = ({
  onPress,
  buttonPosition,
  isRecording
}: FloatingButtonProps) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          position: 'absolute',
          backgroundColor: isRecording ? '#c71f1f' : '#333',
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
        <Circle size={24} color={'#9c2020'} fill={'#9c2020'} />
      ) : (
        <Bug size={24} color={'#9ca3af'} />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(FloatingButton);

