import axios from 'axios';
import RNFS from 'react-native-fs';
import mime from 'mime';
import { FeedbackPayload, SlackConfig } from '../types/types';
import { SLACK_API_ENDPOINTS } from '../utils/endpoints';

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
    const res = await axios.post(
      SLACK_API_ENDPOINTS.POST_MESSAGE,
      {
        channel: channelId,
        text: `*${type.toUpperCase()}* - *${title}*\n${message}`,
      },
      {
        headers: {
          Authorization: `Bearer ${botToken}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );

    if (!res.data.ok) throw new Error(res.data.error);
    return res.data.ts;
  };

  const uploadFileExternal = async (
    uri: string,
    threadTs: string,
  ) => {
    const fileName = uri.split('/').pop() || 'attachment';
    const fileType = mime.getType(uri) || 'application/octet-stream';
    const fileStat = await RNFS.stat(uri);
    const fileLength = Number(fileStat.size);

    // Step 1: Get upload URL from Slack
    const uploadURLRes = await axios.post(
      SLACK_API_ENDPOINTS.GET_UPLOAD_URL,
      {
        filename: fileName,
        length: fileLength,
      },
      {
        headers: {
          Authorization: `Bearer ${botToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    

    if (!uploadURLRes.data.ok) throw new Error(uploadURLRes.data.error);
    const { upload_url, file_id } = uploadURLRes.data;

    // Step 2: Upload file content to upload_url
    const fileData = await RNFS.readFile(uri, 'base64');
    
    // Convert base64 to binary data for React Native
    const binaryString = atob(fileData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    await axios.post(
      upload_url,
      bytes,
      {
        headers: {
          'Content-Type': fileType,
          'Content-Length': fileLength,
        },
      }
    );
    

    // Step 3: Attach the file to the Slack thread
    const completeRes = await axios.post(
      SLACK_API_ENDPOINTS.COMPLETE_UPLOAD,
      {
        files: [
          {
            id: file_id,
            title: fileName,
          },
        ],
        channel_id: channelId,
        thread_ts: threadTs,
      },
      {
        headers: {
          Authorization: `Bearer ${botToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    

    if (!completeRes.data.ok) throw new Error(completeRes.data.error);
  };

  try {
    const threadTs = await postMainMessage();
    console.log(threadTs)
    if (screenshotUri) await uploadFileExternal(screenshotUri, threadTs);
    if (videoUri) await uploadFileExternal(videoUri, threadTs);
    console.log('[Slack] Report sent successfully');
  } catch (err) {
    console.error('[Slack] Error sending report:', err);
  }
};
