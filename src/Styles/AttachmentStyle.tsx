import { StyleSheet } from 'react-native';

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
    backgroundColor: '#111827',
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
    color: '#d1d5db',
    marginTop: 4,
  },
  removeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 2,
  },
  previewTypeIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 2,
    zIndex: 2,
  },
});
