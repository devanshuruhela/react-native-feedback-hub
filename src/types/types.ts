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

export interface FeedbackContextType {
  toggleModal: () => void;
  toggleRecording: () => void;
  slackWebhook?: string;
  jiraConfig?: JiraConfig;
  isRecording: boolean;
   title: string,
   message: string,
   screenshot: string | null,
   setTitle: React.Dispatch<React.SetStateAction<string>>,
   setMessage: React.Dispatch<React.SetStateAction<string>>,
   setScreenshot: React.Dispatch<React.SetStateAction<string | null>>
}

export interface feedbackButtonPositionType {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };