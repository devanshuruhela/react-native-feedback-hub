export type FeedbackType = 'bug' | 'suggestion';

export interface FeedbackPayload {
  title: string;
  message: string;
  type: FeedbackType;
  screenshot?: string | null;
  video?: string | null;
}

export interface JiraConfig {
  host: string;
  email: string;
  apiToken: string;
  projectKey: string;
}

export interface SlackConfig {
  botToken: string;
  channelId: string;
}

export interface MicrosoftTeamsConfig {
  accessToken: string;
  teamId: string;
  channelId: string;
}

export interface DiscordConfig {
  webhookUrl: string;
}

export interface FeedbackProviderProps {
  children: React.ReactNode;
  feedbackButtonPosition?: FeedbackButtonPositionType;
  additionalInfo?: string;
  config?: {
    jiraConfig?: JiraConfig;
    slackConfig?: SlackConfig;
    microsoftTeamsConfig?: MicrosoftTeamsConfig;
    discordConfig?: DiscordConfig;
    webhook?: string;
  };
  enabled?: boolean;
  showFloatingButton?: boolean;
  enableScreenShot?: boolean;
  enableScreenRecording?: boolean;
}

export interface FeedbackContextType {
  setModalVisible: (value: boolean) => void;
  toggleRecording: () => void;
  slackConfig?: SlackConfig;
  jiraConfig?: JiraConfig;
  microsoftTeamsConfig?: MicrosoftTeamsConfig;
  discordConfig?: DiscordConfig;
  webhook?: string;
  isRecording: boolean;
  title: string;
  message: string;
  additionalInfo?: string;
  screenshot: string | null;
  type: FeedbackType;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setScreenshot: React.Dispatch<React.SetStateAction<string | null>>;
  setType: React.Dispatch<React.SetStateAction<FeedbackType>>;
}

export interface FeedbackButtonPositionType {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
