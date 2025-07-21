import axios from 'axios';
import mime from 'mime';

import { FeedbackPayload, SlackConfig } from '../types/types';

export const sendToSlack = async (
  payload: FeedbackPayload,
  slackConfig: SlackConfig,
) => {
  const {
    title,
    message,
    type,
    screenshot: screenshotUri,
    video: videoUri,
  } = payload;
  const { botToken, channelId } = slackConfig;

  const postMainMessage = async () => {
    const response = await axios.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: channelId,
        text: `*${type.toUpperCase()}* - *${title}*\n${message}`,
      },
      {
        headers: {
          Authorization: `Bearer ${botToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.data.ok) {
      console.error('[Slack] Failed to post main message:', response.data);
      throw new Error(response.data.error);
    }

    return response.data.ts;
  };

  const uploadFileToThread = async (uri: string, threadTs: string) => {
    const fileName = uri.split('/').pop() || 'attachment';
    const mimeType = mime.getType(uri) || 'application/octet-stream';

    const formData = new FormData();
    formData.append('channels', channelId);
    formData.append('thread_ts', threadTs);
    formData.append('filename', fileName);
    formData.append('title', fileName);
    formData.append('file', {
      uri,
      name: fileName,
      type: mimeType,
    });

    const response = await axios.post(
      'https://slack.com/api/files.upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${botToken}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (!response.data.ok) {
      console.error(
        `[Slack] File upload failed for ${fileName}:`,
        response.data,
      );
      throw new Error(response.data.error);
    }

    return response.data.file;
  };

  try {
    const threadTs = await postMainMessage();

    if (videoUri) await uploadFileToThread(videoUri, threadTs);
    if (screenshotUri) await uploadFileToThread(screenshotUri, threadTs);

    console.log('[Slack] Report sent as threaded message');
  } catch (err) {
    console.error('[Slack] Failed to send threaded report:', err);
    throw err;
  }
};
