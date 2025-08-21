import { Text, TouchableOpacity, View } from 'react-native';
import { FeedbackType } from '../types/types';
import { ModalStyles as styles } from '../Styles/ModalStyle';
import { colors } from '../tokens/colors';
import { Bug, Lightbulb } from 'lucide-react-native';
import { memo } from 'react';

const TypeSelector = ({
  type,
  setType,
}: {
  type: FeedbackType;
  setType: (type: FeedbackType) => void;
}) => (
  <View style={styles.typeButtons}>
    <TouchableOpacity
      style={[styles.typeButton, type === 'bug' && styles.activeBug]}
      onPress={() => setType('bug')}
    >
      <Bug
        size={16}
        color={type === 'bug' ? colors.status.error.text : colors.text.inverse}
      />
      <Text style={[styles.typeText, type === 'bug' && styles.activeBugText]}>
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
        color={
          type === 'suggestion'
            ? colors.status.success.text
            : colors.text.inverse
        }
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
);

export default memo(TypeSelector);
