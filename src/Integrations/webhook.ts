import axios from 'axios';
import { FeedbackPayload } from '../types/types';
import { getFileNameAndType } from '../utils/getFileNameAndType';

export const sendToWebhook = async (
  payload: FeedbackPayload,
  webhookUrl: string,
): Promise<void> => {
  const { message, title, type, screenshot: screenshot, video } = payload;

  if (!webhookUrl) {
    console.warn('Webhook URL not provided');
    return;
  }

  const form = new FormData();

  form.append(
    'content',
    `\n[${type.toUpperCase()}]\n**Title:** ${title}\n**Message:**\n${message}`,
  );

  if (screenshot) {
    const { fileName, fileType } = getFileNameAndType(screenshot);
    form.append('file' + 1, {
      uri: screenshot,
      name: `file_1.${fileName}`,
      type: fileType,
    });
  }

  if (video) {
    const { fileName, fileType } = getFileNameAndType(video);
    form.append('file' + 2, {
      uri: video,
      name: `file_2.${fileName}`,
      type: fileType,
    });
  }

  try {
    await axios.post(webhookUrl, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.info('Feedback sent to successfully.');
  } catch (err) {
    throw Error('Failed to send feedback to Webhook:',);
  }
};
