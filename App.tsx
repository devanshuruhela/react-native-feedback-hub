/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, useColorScheme } from 'react-native';
import { FeedbackHubProvider } from './src';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <FeedbackHubProvider
      config={{webhook:'abc'}}
      enabled
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </FeedbackHubProvider>
  );
}

export default App;
