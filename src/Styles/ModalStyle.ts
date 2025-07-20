import { StyleSheet } from "react-native";

export const ModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    width: '100%',
    maxWidth: 450,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f9fafb',
  },
  form: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d1d5db',
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    marginRight: 8,
  },
  activeBug: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  activeSuggestion: {
    backgroundColor: '#effff0',
    borderColor: '#65a473',
  },
  typeText: {
    fontSize: 12,
    color: '#374151',
  },
  activeBugText: {
    color: '#991b1b',
  },
  activeSuggestionText: {
    color: '#25af1e',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#4b5563',
    backgroundColor: '#374151',
    color: '#f9fafb',
    fontSize: 14,
    marginBottom: 16,
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  attachments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#374151',
    borderColor: '#4b5563',
    borderWidth: 1,
    borderRadius: 6,
    flex: 1,
  },
  attachmentText: {
    fontSize: 12,
    color: '#d1d5db',
    marginLeft: 5,
  },
  recording: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  recordingText: {
    color: '#991b1b',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  recordingLabel: {
    fontSize: 12,
    color: '#dc2626',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  secondaryButton: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
    borderWidth: 1,
  },
  secondaryText: {
    color: '#d1d5db',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  primaryButtonDisabled: {
    backgroundColor: '#4b5563',
    color: '#9ca3af',
  },
  primaryText: {
    color: '#fff',
    fontSize: 14,
  },
});