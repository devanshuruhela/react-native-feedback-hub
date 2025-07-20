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
}