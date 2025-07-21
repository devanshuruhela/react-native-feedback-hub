import axios from 'axios';
import mime from 'mime';
import { FeedbackPayload, MicrosoftTeamsConfig } from '../types/types';
import { readFile } from 'react-native-fs';

export const sendToTeams = async (
  payload: FeedbackPayload,
  config: MicrosoftTeamsConfig,
) => {
  const { title, message, type, screenshot, video } = payload;

  const { accessToken, teamId, channelId } = config;
  const fileUris = [screenshot, video].filter(Boolean) as string[];

  const uploadedFileNames: string[] = [];

  try {
    // 1. Upload files
    for (const uri of fileUris) {
      const fileName = uri.split('/').pop() || 'feedback_file';
      const mimeType = mime.getType(uri) || 'application/octet-stream';

      const sessionRes = await axios.post(
        `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/filesFolder:/FeedbackSDK/${fileName}:/createUploadSession`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const uploadUrl = sessionRes.data.uploadUrl;
      const fileBase64 = await readFile(uri, 'base64');
      const fileBuffer = Buffer.from(fileBase64, 'base64');

      await axios.put(uploadUrl, fileBuffer, {
        headers: {
          'Content-Length': fileBuffer.length,
          'Content-Type': mimeType,
        },
      });

      uploadedFileNames.push(fileName);
    }

    // 2. Send main message
    const mainContent = `**[${type.toUpperCase()}] ${title}**\n${message}`;

    const messageRes = await axios.post(
      `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`,
      {
        body: { content: mainContent },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const messageId = messageRes.data.id;

    // 3. Reply with uploaded file names
    if (uploadedFileNames.length > 0) {
      const fileList = uploadedFileNames.map(name => `• ${name}`).join('\n');
      const replyMessage = `**Attached Files:**\n${fileList}`;

      await axios.post(
        `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages/${messageId}/replies`,
        {
          body: { content: replyMessage },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    }

    console.log('[Teams] Feedback with threaded attachments sent successfully');
  } catch (err: any) {
    console.error(
      '[Teams] Failed to send threaded feedback:',
      err.message || err,
    );
    throw err;
  }
};
