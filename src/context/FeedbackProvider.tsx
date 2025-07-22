import React, { createContext, useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import FeedbackModal from '../components/FeedbackModal';
import { colors } from '../tokens/colors';
import {
  FeedbackButtonPositionType,
  FeedbackContextType,
  JiraConfig,
  MicrosoftTeamsConfig,
  SlackConfig,
} from '../types/types';

const FeedbackContext = createContext<FeedbackContextType>({
  toggleModal: () => {},
  toggleRecording: () => {},
  isRecording: false,
  title: '',
  message: '',
  screenshot: '',
  setTitle: () => {},
  setMessage: () => {},
  setScreenshot: () => {},
  slackConfig: undefined,
  jiraConfig: undefined,
  microsoftTeamsConfig: undefined,
});

export const useFeedback = () => useContext(FeedbackContext);

interface FeedbackProviderProps {
  children: React.ReactNode;
  feedbackButtonPosition?: FeedbackButtonPositionType;
  jiraConfig?: JiraConfig;
  slackConfig?: SlackConfig;
  microsoftTeamsConfig?: MicrosoftTeamsConfig;
  enabled?: boolean;
}

export const FeedbackProvider = ({
  feedbackButtonPosition = {
    bottom: 30,
    right: 30,
  },
  children,
  slackConfig,
  jiraConfig,
  microsoftTeamsConfig,
  enabled = false,
}: FeedbackProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const toggleModal = useCallback(() => setVisible(!visible), [visible]);
  const toggleRecording = useCallback(
    () => setIsRecording(!isRecording),
    [isRecording],
  );
  return (
    <FeedbackContext.Provider
      value={{
        toggleModal,
        slackConfig,
        jiraConfig,
        microsoftTeamsConfig,
        isRecording,
        toggleRecording,
        title,
        message,
        screenshot,
        setTitle,
        setMessage,
        setScreenshot,
      }}
    >
      <View style={styles.flex}>
        {enabled ? (
          <>
            {children}
            {
              <FloatingButton
                buttonPosition={feedbackButtonPosition}
                onPress={toggleModal}
                isRecording={isRecording}
              />
            }
            {visible && <FeedbackModal onClose={toggleModal} />}
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
