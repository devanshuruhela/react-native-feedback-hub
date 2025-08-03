import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  Bug,
  Lightbulb,
  Camera,
  Video,
  Square,
  Circle,
  X,
  CircleCheck,
  CircleX,
} from 'lucide-react-native';
import { useFeedback } from '../context/FeedbackHubProvider';
import captureScreen from '../utils/captureScreen';
import { sendToSlack } from '../Integrations/slack';
import { sendToJira } from '../Integrations/jira';
import { useScreenRecorder } from '../hooks/useScreenRecorder';
import { FeedbackPayload } from '../types/types';
import { ModalStyles as styles } from '../Styles/ModalStyle';
import AttachmentPreview from './AttachmentPreview';
import { useStoragePermission } from '../hooks/useStoragePermision';
import { sendToTeams } from '../Integrations/teams';
import { colors } from '../tokens/colors';
import { sendToDiscord } from '../Integrations/discord';

const FeedbackModal = ({ onClose }: { onClose: () => void }) => {
  const {
    slackConfig,
    jiraConfig,
    microsoftTeamsConfig,
    discordConfig,
    toggleRecording,
    isRecording,
    title,
    type,
    message,
    additionalInfo,
    screenshot,
    setMessage,
    setScreenshot,
    setTitle,
    setType
  } = useFeedback();
  const { start, stop, videoUri, setVideoUri, cleanup } = useScreenRecorder();
  const { granted, requestPermission } = useStoragePermission();
  const disableSubmit = !title || !message;
  const [visible, setVisible] = useState<boolean>(true);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [status, setStatus] = useState<'success' | 'failed' | undefined>(
    undefined,
  );
  const  scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);


  useEffect(() => {
    if (status || screenshot || videoUri) {
      scrollViewRef.current?.scrollToEnd();
    }
  }, [screenshot, status, videoUri])
  

  const handleRecording = async () => {
    if (!isRecording) {
      const res = await start();
      if (res === 'started') {
        toggleRecording();
        onClose();
      }
    } else {
      await stop();
      toggleRecording();
    }
  };

  const handleCapture = async () => {
    setVisible(false);  
    await new Promise(res => setTimeout(res, 200));
    const shot = await captureScreen();
    setScreenshot(shot);
    setVisible(true);
  };

  const handleCancelAndClear = async () => {
    setTitle('');
    setMessage('');
    setScreenshot('');
    setType('bug')
    if (videoUri) {
      await cleanup();
    } else {
      setVideoUri('');
    }
  };

  const handleSubmit = async () => {
    setStatus(undefined);
    setIsPending(true);
    try {
      const payload: FeedbackPayload = {
        title,
        message: `${message}\n${additionalInfo}`,
        type,
        screenshot,
        video: videoUri,
      };

      if (slackConfig) await sendToSlack(payload, slackConfig);
      if (jiraConfig) await sendToJira(payload, jiraConfig);
      if (microsoftTeamsConfig)
        await sendToTeams(payload, microsoftTeamsConfig);
      if(discordConfig){
        await sendToDiscord(payload, discordConfig)
      }
      await handleCancelAndClear();
      setIsPending(false);
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setStatus('failed');
      setIsPending(false);
      console.error('Feedback submission failed:', error);
    }
  };

  if (!granted || !visible) {
    return null;
  }

  return (  
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      navigationBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Feedback Hub</Text>
            <Pressable onPress={onClose}>
              <X color={colors.text.muted} />
            </Pressable>
          </View>
          <ScrollView ref={scrollViewRef}>
            <Pressable style={styles.form}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeButtons}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'bug' && styles.activeBug,
                  ]}
                  onPress={() => setType('bug')}
                >
                  <Bug
                    size={16}
                    color={type === 'bug' ? colors.status.error.text : colors.text.inverse}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      type === 'bug' && styles.activeBugText,
                    ]}
                  >
                    {' '}
                    Bug
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'suggestion' && styles.activeSuggestion,
                  ]}
                  onPress={() => setType('suggestion')}
                >
                  <Lightbulb
                    size={16}
                    color={type === 'suggestion' ? colors.status.success.text : colors.text.inverse}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      type === 'suggestion' && styles.activeSuggestionText,
                    ]}
                  >
                    {' '}
                    Suggestion
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Title</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Brief description of the issue or suggestion"
                placeholderTextColor={colors.text.muted}
                enterKeyHint="done"
                submitBehavior="blurAndSubmit"
              />

              <Text style={styles.label}>Details</Text>
              <TextInput
                value={message}
                onChangeText={setMessage}
                style={[styles.input, styles.textarea]}
                placeholder="Please provide more details about your feedback..."
                placeholderTextColor={colors.text.muted}
                multiline
                scrollEnabled
                enterKeyHint="done"
                submitBehavior="blurAndSubmit"
              />

              <Text style={styles.label}>Attachments</Text>
              <View style={styles.attachments}>
                <TouchableOpacity
                  style={styles.attachmentButton}
                  onPress={handleCapture}
                >
                  <Camera size={16} color={colors.text.muted} />
                  <Text style={styles.attachmentText}> Screenshot</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.attachmentButton,
                    isRecording && styles.recording,
                  ]}
                  onPress={handleRecording}
                >
                  {isRecording ? (
                    <Square size={16} color={colors.status.error.text} />
                  ) : (
                    <Video size={16} color={colors.text.muted} />
                  )}
                  <Text
                    style={[
                      styles.attachmentText,
                      isRecording && styles.recordingText,
                    ]}
                  >
                    {isRecording ? ' Stop Recording' : ' Record Screen'}
                  </Text>
                </TouchableOpacity>
              </View>

              {isRecording && (
                <View style={styles.recordingIndicator}>
                  <Circle size={12} color={colors.status.warning.text} fill={colors.status.warning.text} />
                  <Text style={styles.recordingLabel}>
                    {' '}
                    Recording in progress...
                  </Text>
                </View>
              )}

              <AttachmentPreview
                screenshotUri={screenshot}
                recordingUri={videoUri}
                onRemoveScreenshot={() => setScreenshot(null)}
                onRemoveRecording={() => {
                  if(videoUri){
                    cleanup();
                  }else{
                    setVideoUri(null);
                  }
                }}
              />
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    handleCancelAndClear();
                    onClose();
                  }}
                  style={[styles.button, styles.secondaryButton]}
                >
                  <Text style={styles.secondaryText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    styles.button,
                    disableSubmit
                      ? styles.primaryButtonDisabled
                      : styles.primaryButton,
                  ]}
                  disabled={disableSubmit || isPending}
                >
                  {isPending ? (
                    <ActivityIndicator color={colors.text.white} />
                  ) : (
                    <Text style={styles.primaryText}>{`${type === 'bug' ? 'Report Bug' : 'Send Suggestion'}`}</Text>
                  )}
                </TouchableOpacity>
              </View>
              {status && (
                <View style={styles.statusNudge}>
                  {status === 'success' ? (
                    <CircleCheck size={15} color={colors.status.success.text} />
                  ) : (
                    <CircleX size={15} color={colors.status.error.text} />
                  )}
                  <Text
                    style={
                      status === 'success'
                        ? styles.successLabel
                        : styles.errorLabel
                    }
                  >
                    {' '}
                    {status === 'success'
                      ? 'Feedback submitted successfully!'
                      : 'Failed to submit feedback, try again!'}
                  </Text>
                </View>
              )}
            </Pressable>
          </ScrollView>
        </View>
   
      </Pressable>  
    </Modal>    
  
  );
};

export default React.memo(FeedbackModal);
