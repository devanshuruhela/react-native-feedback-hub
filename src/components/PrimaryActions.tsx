import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { FeedbackType } from '../types/types';
import { ModalStyles as styles } from '../Styles/ModalStyle';
import { colors } from '../tokens/colors';
import { memo } from 'react';

const Actions = ({
  handleCancelAndClear,
  onClose,
  handleSubmit,
  disableSubmit,
  isPending,
  type,
}: {
  handleCancelAndClear: () => void;
  onClose: () => void;
  handleSubmit: () => void;
  disableSubmit: boolean;
  isPending: boolean;
  type: FeedbackType;
}) => (
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
        disableSubmit ? styles.primaryButtonDisabled : styles.primaryButton,
      ]}
      disabled={disableSubmit || isPending}
    >
      {isPending ? (
        <ActivityIndicator color={colors.text.white} />
      ) : (
        <Text style={styles.primaryText}>{`${
          type === 'bug' ? 'Report Bug' : 'Send Suggestion'
        }`}</Text>
      )}
    </TouchableOpacity>
  </View>
);

export default memo(Actions);
