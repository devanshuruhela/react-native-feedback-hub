import React, { createContext, useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import FeedbackModal from '../components/FeedbackModal';
import { colors } from '../tokens/colors';
import {
  FeedbackContextType,
  FeedbackProviderProps,
  FeedbackType,
} from '../types/types';
import { useModalBackHandler } from '../hooks/useBackHandler';

const FeedbackContext = createContext<FeedbackContextType>({
  setModalVisible: () => {},
  toggleRecording: () => {},
  isRecording: false,
  title: '',
  message: '',
  screenshot: '',
  additionalInfo: '',
  setTitle: () => {},
  setMessage: () => {},
  setScreenshot: () => {},
  setType: () => {},
  slackConfig: undefined,
  jiraConfig: undefined,
  microsoftTeamsConfig: undefined,
  webhook: undefined,
  type: 'bug',
});

export const useFeedback = () => useContext(FeedbackContext);

export const useFeedbackHub = () => {
  const { setModalVisible } = useFeedback();
  return {
    open: () => setModalVisible(true),
    close: () => setModalVisible(false),
  };
};

export const FeedbackHubProvider = ({
  feedbackButtonPosition = {
    bottom: 30,
    right: 30,
  },
  children,
  config,
  enabled = true,
  additionalInfo = '',
  showFloatingButton = true,
  enableScreenRecording = true,
  enableScreenShot = true,
}: FeedbackProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [type, setType] = useState<FeedbackType>('bug');
  const setModalVisible = useCallback(
    (value: boolean) => setVisible(value),
    [],
  );
  const toggleRecording = useCallback(
    () => setIsRecording(!isRecording),
    [isRecording],
  );

  useModalBackHandler(visible, () => setModalVisible(false));
  return (
    <FeedbackContext.Provider
      value={{
        setModalVisible,
        isRecording,
        toggleRecording,
        title,
        message,
        additionalInfo,
        screenshot,
        setTitle,
        setMessage,
        setScreenshot,
        type,
        setType,
        ...config,
      }}
    >
      <View style={styles.flex}>
        {enabled && config && Object.keys(config).length ? (
          <>
            {children}
            {showFloatingButton && (
              <FloatingButton
                buttonPosition={feedbackButtonPosition}
                onPress={() => setModalVisible(true)}
                isRecording={isRecording}
              />
            )}
            {visible && (
              <FeedbackModal
                onClose={() => setModalVisible(false)}
                isScreenRecordingEnabled={enableScreenRecording}
                isScreenShotEnabled={enableScreenShot}
              />
            )}
            {isRecording && (
              <View pointerEvents="none" style={styles.RecordingView} />
            )}
          </>
        ) : null}
      </View>
    </FeedbackContext.Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  RecordingView: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.legacy.red,
    borderRadius: 30,
    height: '100%',
    width: '100%',
  },
});
