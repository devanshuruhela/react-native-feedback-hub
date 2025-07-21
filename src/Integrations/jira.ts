import { FeedbackPayload, JiraConfig } from '../types/types';
import axios from 'axios';
import mime from 'mime';
import { readFile } from 'react-native-fs';

export const sendToJira = async (
  payload: FeedbackPayload,
  config: JiraConfig,
) => {
  const { email, apiToken, projectKey, host } = config;

  const {
    message,
    title,
    type,
    screenshot: screenshotUri,
    video: videoUri,
  } = payload;

  try {
    const issueResponse = await axios.post(
      `https://${host}/rest/api/3/issue`,
      {
        fields: {
          project: { key: projectKey },
          summary: `[${type.toUpperCase()}] ${title}`,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: `[${type.toUpperCase()}] ${message}`,
                    type: 'text',
                  },
                ],
              },
            ],
          },
          issuetype: { name: type === 'bug' ? 'Bug' : 'Task' },
        },
      },
      {
        headers: {
          Authorization: `Basic ${btoa(`${email}:${apiToken}`)}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const issueIdOrKey = issueResponse.data.key;
    const attachments = [screenshotUri, videoUri].filter(Boolean) as string[];

    for (const uri of attachments) {
      const fileName = uri.split('/').pop() || 'attachment';
      const fileType = mime.getType(uri) || 'application/octet-stream';
      const fileData = await readFile(uri, 'base64');

      const fileBuffer = Buffer.from(fileData, 'base64');

      await axios.post(
        `https://${host}/rest/api/3/issue/${issueIdOrKey}/attachments`,
        fileBuffer,
        {
          headers: {
            Authorization: `Basic ${btoa(`${email}:${apiToken}`)}`,
            'X-Atlassian-Token': 'no-check',
            'Content-Type': fileType,
            'Content-Disposition': `attachment; filename="${fileName}"`,
          },
        },
      );
    }

    return { success: true, issueKey: issueIdOrKey };
  } catch (error: any) {
    console.error(
      'Jira Integration Error:',
      error.response?.data || error.message,
    );
    return { success: false, error: error.response?.data || error.message };
  }
};
