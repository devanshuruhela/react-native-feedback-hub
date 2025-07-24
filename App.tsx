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
      config={{discordConfig:{
        webhookUrl: 'https://discord.com/api/webhooks/1398055334765133987/EVZxBpQMVXAmiHAhi_G1Jw8XZt2GB9YaCO6Hctw-GsOtpZhMh7dx5LQrkp226lLR-9vG'
      }}}
      enabled
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </FeedbackProvider>
  );
}

export default App;
