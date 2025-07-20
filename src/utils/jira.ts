import { FeedbackPayload, JiraConfig } from '../types/types';

export const sendToJira = async (payload: FeedbackPayload, config: JiraConfig) => {
  const { host, email, apiToken, projectKey } = config;

  console.log({
        project: { key: projectKey },
        summary: payload.title,
        description: payload.message + (payload.video ? `\nVideo: ${payload.video}` : ''),
        issueType: { name: 'Bug' },
      })

      return

  await fetch(`https://${host}/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${email}:${apiToken}`)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        project: { key: projectKey },
        summary: payload.title,
        description: payload.message + (payload.video ? `\nVideo: ${payload.video}` : ''),
        issueType: { name: 'Bug' },
      },
    }),
  });
};