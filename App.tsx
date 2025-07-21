/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, useColorScheme } from 'react-native';
import { FeedbackProvider } from './src';
import { NewAppScreen } from '@react-native/new-app-screen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
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
          <NewAppScreen />
        </FeedbackProvider>
  );
}

export default App;
