import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import FeedbackModal from '../components/FeedbackModal';
import { FeedbackContextType, JiraConfig } from '../types/types';

const FeedbackContext = createContext<FeedbackContextType>({
  toggleModal: () => {},
  toggleRecording: () => {},
  isRecording: false,
});

export const useFeedback = () => useContext(FeedbackContext);

interface FeedbackProviderProps {
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  children: React.ReactNode;
  slackWebhook?: string;
  jiraConfig?: JiraConfig;
}

export const FeedbackProvider = ({
  position = 'bottomRight',
  children,
  slackWebhook,
  jiraConfig,
}: FeedbackProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const toggleModal = () => setVisible(!visible);
  const toggleRecording = () => setIsRecording(!isRecording);

  return (
    <FeedbackContext.Provider
      value={{
        toggleModal,
        slackWebhook,
        jiraConfig,
        isRecording,
        toggleRecording,
      }}
    >
      <View style={styles.flex} >
        {children}        
        <FloatingButton
          position={position}
          onPress={toggleModal}
        />
        {visible && <FeedbackModal onClose={toggleModal} />}
        {isRecording && <View style={styles.RecordingView}/>}
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