import React, { createContext, useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import FeedbackModal from '../components/FeedbackModal';
import { colors } from '../tokens/colors';
import {
  DiscordConfig,
  FeedbackButtonPositionType,
  FeedbackContextType,
  FeedbackType,
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
  additionalInfo: '',
  setTitle: () => {},
  setMessage: () => {},
  setScreenshot: () => {},
  setType: () => {},
  slackConfig: undefined,
  jiraConfig: undefined,
  microsoftTeamsConfig: undefined,
  type: 'bug',
});

export const useFeedback = () => useContext(FeedbackContext);

interface FeedbackProviderProps {
  children: React.ReactNode;
  feedbackButtonPosition?: FeedbackButtonPositionType;
  additionalInfo?: string;
  config?: {
    jiraConfig?: JiraConfig;
    slackConfig?: SlackConfig;
    microsoftTeamsConfig?: MicrosoftTeamsConfig;
    discordConfig?: DiscordConfig;
  };
  enabled?: boolean;
}

export const FeedbackHubProvider = ({
  feedbackButtonPosition = {
    bottom: 30,
    right: 30,
  },
  children,
  config,
  enabled = false,
  additionalInfo = '',
}: FeedbackProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [type, setType] = useState<FeedbackType>('bug');

  const toggleModal = useCallback(() => setVisible(!visible), [visible]);
  const toggleRecording = useCallback(
    () => setIsRecording(!isRecording),
    [isRecording],
  );
  return (
    <FeedbackContext.Provider
      value={{
        toggleModal,
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
