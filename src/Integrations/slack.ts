import { FeedbackPayload } from '../types/types';

export const sendToSlack = async (payload: FeedbackPayload, webhookUrl: string) => {
  const message: any = {
    text: `*${payload.type.toUpperCase()}* - ${payload.title}\n${payload.message}`,
    attachments: [],
  };

  if (payload.screenshot) {
    message.attachments.push({ image_url: payload.screenshot, text: 'Screenshot' });
  }
  if (payload.video) {
    message.attachments.push({ title: 'Video', text: payload.video });
  }

  console.log(JSON.stringify(message))
  return

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
};