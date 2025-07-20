import React, { createContext, useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import FeedbackModal from '../components/FeedbackModal';
import { feedbackButtonPositionType, FeedbackContextType, JiraConfig } from '../types/types';

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
  slackWebhook: undefined,
  jiraConfig: undefined,
});

export const useFeedback = () => useContext(FeedbackContext);

interface FeedbackProviderProps {
  children: React.ReactNode;
  slackWebhook?: string;
  feedbackButtonPosition?: feedbackButtonPositionType
  jiraConfig?: JiraConfig;
}

export const FeedbackProvider = ({
  feedbackButtonPosition = {
    bottom: 30,
    right: 30,
  },
  children,
  slackWebhook,
  jiraConfig,
}: FeedbackProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const toggleModal = useCallback(
    () => setVisible(!visible),
    [visible],
  )
  const toggleRecording = useCallback(
    () => setIsRecording(!isRecording),
    [isRecording],
  )
 ;

  return (
    <FeedbackContext.Provider
      value={{
        toggleModal,
        slackWebhook,
        jiraConfig,
        isRecording,
        toggleRecording,
        title,
        message,
        screenshot,
        setTitle,
        setMessage,
        setScreenshot
      }}
    >
      <View style={styles.flex}>
        {children}
        {<FloatingButton buttonPosition={feedbackButtonPosition} onPress={toggleModal} isRecording={isRecording} />}
        {visible && <FeedbackModal onClose={toggleModal} />}
        {isRecording && <View style={styles.RecordingView} />}
      </View>
    </FeedbackContext.Provider>
  );
};


const styles = StyleSheet.create({
    flex:{
      flex:1,
    },
    RecordingView:{
      position:'absolute',
      borderWidth: 2,
      borderColor: 'red',
      borderRadius: 40,
      height: '100%',
      width: '100%',
    }
  })