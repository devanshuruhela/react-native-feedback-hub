import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface FloatingButtonProps {
  onPress: () => void;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

const FloatingButton = ({
  onPress,
  position,
}: FloatingButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: position.includes('bottom') ? 30 : undefined,
      top: position.includes('top') ? 30 : undefined,
      right: position.includes('Right') ? 20 : undefined,
      left: position.includes('Left') ? 20 : undefined,
      backgroundColor:'#333',
      padding: 10,
      borderRadius: 30,
      zIndex: 9999,
    },
    color: {
      color: 'white',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.color}>{'✉️'}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
