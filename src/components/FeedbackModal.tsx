import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {
  Bug,
  Lightbulb,
  Camera,
  Video,
  Square,
  Circle,
  X,
} from 'lucide-react-native';
import { useFeedback } from '../context/FeedbackProvider';
import captureScreen from '../utils/captureScreen';
import { sendToSlack } from '../Integrations/slack';
import { sendToJira } from '../Integrations/jira'
import { useScreenRecorder } from '../hooks/useScreenRecorder';
import { FeedbackPayload, FeedbackType } from '../types/types';
import { ModalStyles as styles } from '../Styles/ModalStyle';
import AttachmentPreview from './AttachmentPreview';
import { useStoragePermission } from '../hooks/useStoragePermision';

const FeedbackPopover = ({ onClose }: { onClose: () => void }) => {
  const [type, setType] = useState<FeedbackType>('bug');
  const { slackWebhook, jiraConfig, toggleRecording , isRecording , title ,message , screenshot ,setMessage ,setScreenshot , setTitle } = useFeedback();
  const { start, stop, videoUri , setVideoUri } = useScreenRecorder();
  const { granted, requestPermission } = useStoragePermission();
  const disableSubmit = !title || !message
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleRecording = async () =>{
    if (!isRecording) {
      const res = await start();
      if(res === 'started'){
        toggleRecording();
        onClose();
      }
    }
    else{
      await stop();
      toggleRecording();
    }
  }

  const handleCapture = async () => {
    const shot = await captureScreen();
    setScreenshot(shot);
  };

  const handleCancelAndClear = () => {
      setTitle('');
      setMessage('');
      setScreenshot('');
      onClose();
    };

  const handleSubmit = async () => {
    const payload: FeedbackPayload = {
      title,
      message,
      type,
      screenshot,
      video: videoUri,
    };
    if (slackWebhook) await sendToSlack(payload, slackWebhook);
    if (jiraConfig) await sendToJira(payload, jiraConfig);
    handleCancelAndClear();
  };

  if(!granted){
    return null;
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent navigationBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Send Feedback</Text>
            <Pressable onPress={onClose}>
              <X color="#9ca3af" />
            </Pressable>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Type</Text>
            <View style={styles.typeButtons}>
              <TouchableOpacity
                style={[styles.typeButton, type === 'bug' && styles.activeBug]}
                onPress={() => setType('bug')}
              >
                <Bug size={16} color={type === 'bug' ? '#991b1b' : '#374151'} />
                <Text
                  style={[
                    styles.typeText,
                    type === 'bug' && styles.activeBugText,
                  ]}
                >
                  {' '}
                  Bug Report
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
                  color={type === 'suggestion' ? '#25af1e' : '#374151'}
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
              placeholderTextColor="#9ca3af"
            />

            <Text style={styles.label}>Details</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              style={[styles.input, styles.textarea]}
              placeholder="Please provide more details about your feedback..."
              placeholderTextColor="#9ca3af"
              multiline
            />

            <Text style={styles.label}>Attachments</Text>
            <View style={styles.attachments}>
              <TouchableOpacity
                style={styles.attachmentButton}
                onPress={handleCapture}
              >
                <Camera size={16} color="#9ca3af" />
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
                  <Square size={16} color="#991b1b" />
                ) : (
                  <Video size={16} color="#9ca3af" />
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
                <Circle size={12} color="#dc2626" fill="#dc2626" />
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
              onRemoveRecording={() => setVideoUri(null)}
            />
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={handleCancelAndClear}
                style={[styles.button, styles.secondaryButton]}
              >
                <Text style={styles.secondaryText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, disableSubmit ? styles.primaryButtonDisabled : styles.primaryButton]}
                disabled={disableSubmit}
              >
                <Text style={styles.primaryText}>Send Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(FeedbackPopover);
