import axios from 'axios';
import mime from 'mime';
import { FeedbackPayload, MicrosoftTeamsConfig } from '../types/types';
import { readFile } from 'react-native-fs';
import { convertToBytes } from '../utils/convertToBuytes';
import { TEAMS_API_ENDPOINTS } from '../utils/endpoints';

export const sendToTeams = async (
  payload: FeedbackPayload,
  config: MicrosoftTeamsConfig,
) => {
  const { title, message, type, screenshot, video } = payload;
  const { accessToken, teamId, channelId } = config;
  const fileUris = [screenshot, video].filter(Boolean) as string[];

  const uploadedFiles: { name: string; webUrl: string }[] = [];

  try {
    // 1. Get filesFolder and driveId
    let filesFolderId;
    let driveId;

    try {
      const channelRes = await axios.get(
        TEAMS_API_ENDPOINTS.getFilesFolder(teamId, channelId),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      filesFolderId = channelRes?.data?.id;
      driveId = channelRes?.data?.parentReference?.driveId;

      if (!filesFolderId || !driveId) {
        throw new Error(
          'filesFolder or driveId not found — ensure channel file storage is initialized.',
        );
      }
    } catch (metaErr: any) {
      console.warn(
        '[Teams] Could not fetch channel metadata:',
        metaErr.response?.data || metaErr.message,
      );
      throw metaErr;
    }

    // 2. Upload each file
    for (const uri of fileUris) {
      const fileName = uri.split('/').pop() || 'feedback_file';
      const mimeType = mime.getType(uri) || 'application/octet-stream';

      try {
        const sessionRes = await axios.post(
          TEAMS_API_ENDPOINTS.createUploadSession(driveId, filesFolderId, fileName),
          {
            item: {
              '@microsoft.graph.conflictBehavior': 'rename',
              name: fileName,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const uploadUrl = sessionRes.data.uploadUrl;

        const fileBase64 = await readFile(uri, 'base64');
        const fileBuffer = convertToBytes(fileBase64);

        await axios.put(uploadUrl, fileBuffer, {
          headers: {
            'Content-Length': fileBuffer.length,
            'Content-Range': `bytes 0-${fileBuffer.length - 1}/${fileBuffer.length}`,
            'Content-Type': mimeType,
          },
        });

        const fileMeta = await axios.get(
          TEAMS_API_ENDPOINTS.getFileMeta(driveId, filesFolderId, fileName),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        uploadedFiles.push({
          name: fileMeta.data.name,
          webUrl: fileMeta.data.webUrl,
        });

        console.log('[Teams] Uploaded:', fileName);
      } catch (uploadError: any) {
        console.error('[Teams] Upload failed for:', fileName);
        console.error(uploadError.response?.data || uploadError.message);
      }
    }

    // 3. Send main feedback message
    const mainContent = `
      <b>${type.toUpperCase()}</b><br/><br/>
      <b>Title:</b> ${title}<br/><br/>
      <b>Details:</b> ${message}<br/>
    `;

    const messageRes = await axios.post(
      TEAMS_API_ENDPOINTS.postMessage(teamId, channelId),
      {
        body: {
          contentType: 'html',
          content: mainContent
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const messageId = messageRes.data.id;

    // 4. Threaded reply with file links
    if (uploadedFiles.length > 0) {
      const fileLinks = uploadedFiles
        .map(f => `• <a href="${f.webUrl}" target="_blank">${f.name}</a>`)
        .join('<br/>');

      const replyMessage = `<b>Attachments:</b><br/>${fileLinks}`;

      await axios.post(
        TEAMS_API_ENDPOINTS.postReply(teamId, channelId, messageId),
        {
          body: {
            contentType: 'html',
            content: replyMessage
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    }

    console.log('[Teams] Feedback message and file links sent.');
  } catch (err: any) {
    console.error('[Teams] Failed to send feedback:', err.message || err);
    throw err;
  }
};
