/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { FeedbackProvider } from './src';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <View style={styles.container}>
        <FeedbackProvider
          slackConfig={{botToken: 'asdsa' , channelId: 'gsfds'}}
          // jiraConfig={{
          //   host: 'your-domain.atlassian.net',
          //   email: 'your-email@example.com',
          //   apiToken: 'your-jira-api-token',
          //   projectKey: 'YOURPROJ',
          // }}
        >
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        </FeedbackProvider>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
