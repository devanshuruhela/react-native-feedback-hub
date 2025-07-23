// Slack APIs
export const SLACK_API_ENDPOINTS = Object.freeze({
  POST_MESSAGE: 'https://slack.com/api/chat.postMessage',
  GET_UPLOAD_URL: 'https://slack.com/api/files.getUploadURLExternal',
  COMPLETE_UPLOAD: 'https://slack.com/api/files.completeUploadExternal',
});


// Atlassian Jira APIs
export const JIRA_API_ENDPOINTS = Object.freeze({
  getProjectIssueTypes: (host: string, projectKey: string) =>
    `https://${host}/rest/api/3/project/${projectKey}`,
  createIssue: (host: string) =>
    `https://${host}/rest/api/3/issue`,
  addAttachment: (host: string, issueIdOrKey: string) =>
    `https://${host}/rest/api/3/issue/${issueIdOrKey}/attachments`,
});


// Microsoft Teams APIs
export const TEAMS_API_ENDPOINTS = Object.freeze({
  getFilesFolder: (teamId: string, channelId: string) =>
    `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/filesFolder`,
  createUploadSession: (driveId: string, filesFolderId: string, fileName: string) =>
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${filesFolderId}:/${fileName}:/createUploadSession`,
  getFileMeta: (driveId: string, filesFolderId: string, fileName: string) =>
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${filesFolderId}:/${fileName}`,
  postMessage: (teamId: string, channelId: string) =>
    `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`,
  postReply: (teamId: string, channelId: string, messageId: string) =>
    `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages/${messageId}/replies`,
});