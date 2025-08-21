import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { Circle, X, CircleCheck, CircleX } from 'lucide-react-native';
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
import TypeSelector from './TypeSelector';
import Attachments from './AttachmentButtons';
import Actions from './PrimaryActions';
import { sendToWebhook } from '../Integrations/webhook';

type TFeedbackModal = {
  onClose: () => void;
  isScreenShotEnabled?: boolean;
  isScreenRecordingEnabled?: boolean;
};

const FeedbackModal = ({
  onClose,
  isScreenRecordingEnabled,
  isScreenShotEnabled,
}: TFeedbackModal) => {
  const {
    slackConfig,
    jiraConfig,
    microsoftTeamsConfig,
    discordConfig,
    webhook,
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
    setType,
  } = useFeedback();
  const { start, stop, videoUri, setVideoUri, cleanup } = useScreenRecorder();
  const { granted, requestPermission } = useStoragePermission();
  const disableSubmit = !title || !message;
  const [visible, setVisible] = useState<boolean>(true);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [status, setStatus] = useState<'success' | 'failed' | undefined>(
    undefined,
  );
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    if (status || screenshot || videoUri) {
      scrollViewRef.current?.scrollToEnd();
    }
  }, [screenshot, status, videoUri]);

  const handleRecording = React.useCallback(async () => {
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
  }, [isRecording, onClose, start, stop, toggleRecording]);

  const handleCapture = useCallback(async () => {
    setVisible(false);
    await new Promise(res => setTimeout(res, 200));
    const shot = await captureScreen();
    setScreenshot(shot);
    setVisible(true);
  }, [setScreenshot]);

  const handleCancelAndClear = useCallback(async () => {
    setTitle('');
    setMessage('');
    setScreenshot('');
    setType('bug');
    if (videoUri) {
      await cleanup();
    } else {
      setVideoUri('');
    }
  }, [
    cleanup,
    setMessage,
    setScreenshot,
    setTitle,
    setType,
    setVideoUri,
    videoUri,
  ]);

  const handleSubmit = useCallback(async () => {
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
      if (discordConfig) {
        await sendToDiscord(payload, discordConfig);
      }
      if (webhook) {
        await sendToWebhook(payload, webhook);
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
  }, [
    additionalInfo,
    discordConfig,
    handleCancelAndClear,
    jiraConfig,
    message,
    microsoftTeamsConfig,
    onClose,
    screenshot,
    slackConfig,
    title,
    type,
    videoUri,
    webhook,
  ]);

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
              <TypeSelector type={type} setType={setType} />

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
                editable
                scrollEnabled
                submitBehavior="newline"
                blurOnSubmit={false}
              />

              {(isScreenShotEnabled || isScreenRecordingEnabled) && (
                <Text style={styles.label}>
                  {isScreenShotEnabled && isScreenRecordingEnabled
                    ? 'Attachments'
                    : 'Attachment'}
                </Text>
              )}
              <Attachments
                isScreenShotEnabled={isScreenShotEnabled}
                isScreenRecordingEnabled={isScreenRecordingEnabled}
                isRecording={isRecording}
                handleCapture={handleCapture}
                handleRecording={handleRecording}
              />

              {isRecording && (
                <View style={styles.recordingIndicator}>
                  <Circle
                    size={12}
                    color={colors.status.warning.text}
                    fill={colors.status.warning.text}
                  />
                  <Text style={styles.recordingLabel}>
                    Recording in progress...
                  </Text>
                </View>
              )}

              <AttachmentPreview
                screenshotUri={screenshot}
                recordingUri={videoUri}
                onRemoveScreenshot={() => setScreenshot(null)}
                onRemoveRecording={() => {
                  if (videoUri) {
                    cleanup();
                  } else {
                    setVideoUri(null);
                  }
                }}
              />
              <Actions
                handleCancelAndClear={handleCancelAndClear}
                onClose={onClose}
                handleSubmit={handleSubmit}
                disableSubmit={disableSubmit}
                isPending={isPending}
                type={type}
              />
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
