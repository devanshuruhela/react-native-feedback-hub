import { StyleSheet } from 'react-native';
import { colors } from '../tokens/colors';

export const ModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: colors.background.primary,
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
    borderColor: colors.border.default,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  form: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
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
    borderColor: colors.border.light,
    backgroundColor: colors.text.primary,
    marginRight: 8,
  },
  activeBug: {
    backgroundColor: colors.status.error.background,
    borderColor: colors.status.error.border,
  },
  activeSuggestion: {
    backgroundColor: colors.status.success.background,
    borderColor: colors.status.success.border,
  },
  typeText: {
    fontSize: 12,
    color: colors.text.inverse,
  },
  activeBugText: {
    color: colors.status.error.text,
  },
  activeSuggestionText: {
    color: colors.status.success.text,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.border.default,
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
    fontSize: 14,
    marginBottom: 16,
  },
  textarea: {
    minHeight: 80,
    maxHeight: 240,
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
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: 6,
    flex: 1,
  },
  attachmentText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 5,
  },
  recording: {
    backgroundColor: colors.status.error.background,
    borderColor: colors.status.error.border,
  },
  recordingText: {
    color: colors.status.error.text,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'center',
  },
  recordingLabel: {
    fontSize: 12,
    color: colors.status.warning.text,
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
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.default,
    borderWidth: 1,
  },
  secondaryText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: colors.interactive.primary,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.interactive.primaryDisabled,
    color: colors.text.muted,
  },
  primaryText: {
    color: colors.text.white,
    fontSize: 14,
  },
  statusNudge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  errorLabel: {
    fontSize: 15,
    letterSpacing:1.2,
    color: colors.status.error.text,
    marginLeft: 4,
  },
  successLabel: {
    fontSize: 15,
    letterSpacing: 1.2,
    color: colors.status.success.text,
    marginLeft: 4,
  },
});
