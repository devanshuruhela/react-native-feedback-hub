import { StyleSheet } from 'react-native';
import { colors } from '../tokens/colors';

export const AttachmentStyles = StyleSheet.create({
  previewContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
    flexWrap: 'wrap',
  },
  previewBox: {
    position: 'relative',
    width: 100,
    height: 100,
    backgroundColor: colors.background.tertiary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 4,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  recordingFileText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  removeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.background.overlayLight,
    borderRadius: 10,
    padding: 2,
  },
  previewTypeIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: colors.background.overlayLight,
    borderRadius: 10,
    padding: 2,
    zIndex: 2,
  },
});
