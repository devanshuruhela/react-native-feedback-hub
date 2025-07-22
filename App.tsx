/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, useColorScheme } from 'react-native';
import { FeedbackProvider } from './src';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <FeedbackProvider
      config={{}}
      enabled
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </FeedbackProvider>
  );
}

export default App;
