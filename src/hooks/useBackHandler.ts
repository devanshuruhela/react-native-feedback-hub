import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useModalBackHandler(visible: boolean, onClose: () => void) {
  useEffect(() => {
    if (!visible) return;

    const handleBack = () => {
      onClose();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
     subscription.remove();
    };
  }, [visible, onClose]);
}