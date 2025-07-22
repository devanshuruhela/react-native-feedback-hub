import { FeedbackPayload, JiraConfig } from '../types/types';
import axios from 'axios';
import mime from 'mime';
import { JIRA_API_ENDPOINTS } from '../utils/endpoints';

// Helper function to get available issue types for the project
const getProjectIssueTypes = async (config: JiraConfig) => {
  const { email, apiToken, projectKey, host } = config;
  
  try {
    const response = await axios.get(
      JIRA_API_ENDPOINTS.getProjectIssueTypes(host, projectKey),
      {
        headers: {
          Authorization: `Basic ${btoa(`${email}:${apiToken}`)}`,
          Accept: 'application/json',
        },
      },
    );
    
    return response.data.issueTypes || [];
  } catch (error) {
    console.warn('Could not fetch project issue types:', error);
    return [];
  }
};

// Helper function to find the best matching issue type
const findIssueType = (issueTypes: any[], feedbackType: string) => {

  const bugType = issueTypes.find(type => 
    type.name.toLowerCase().includes('bug') || 
    type.name.toLowerCase().includes('defect')
  );
  
  const taskType = issueTypes.find(type => 
    type.name.toLowerCase().includes('task') ||
    type.name.toLowerCase().includes('story') ||
    type.name.toLowerCase().includes('feature')
  );
  
  if (feedbackType === 'bug' && bugType) {
    return { id: bugType.id };
  }
  
  if (feedbackType !== 'bug' && taskType) {
    return { id: taskType.id };
  }
  
  return issueTypes.length > 0 ? { id: issueTypes[0].id } : { id: '1' };
};

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
    const availableIssueTypes = await getProjectIssueTypes(config);
    let issueType;
    
    if (availableIssueTypes.length > 0) {
      issueType = findIssueType(availableIssueTypes, type);
    } else {
      issueType = { id: type === 'bug' ? '1' : '10001' };
    }
    const issueResponse = await axios.post(
      JIRA_API_ENDPOINTS.createIssue(host),
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
                    text: `${message}`,
                    type: 'text',
                  },
                ],
              },
            ],
          },
          issuetype: issueType,
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
    const attachments = [screenshotUri,videoUri].filter(Boolean) as string[];

    // Track attachment upload results
    const attachmentResults = [];

    for (const uri of attachments) {
      try {
        const fileName = uri.split('/').pop() || 'attachment';
        const fileType = mime.getType(uri) || 'application/octet-stream';
        
        
        // For React Native, use FormData with file URI directly
        const formData = new FormData();
        formData.append('file', {
          uri: uri,
          type: fileType,
          name: fileName,
        } as any);

        await axios.post(
          JIRA_API_ENDPOINTS.addAttachment(host, issueIdOrKey),
          formData,
          {
            headers: {
              Authorization: `Basic ${btoa(`${email}:${apiToken}`)}`,
              'X-Atlassian-Token': 'no-check',
              'Content-Type': 'multipart/form-data',
            },
            timeout: 50000,
          },
        );
        
        attachmentResults.push({ fileName, success: true });
      } catch (attachmentError: any) {
        console.warn(`Failed to upload attachment ${uri}:`, attachmentError.message);
        attachmentResults.push({ 
          fileName: uri.split('/').pop() || 'attachment', 
          success: false, 
          error: attachmentError.message 
        });
      }
    }

    return { success: true, issueKey: issueIdOrKey };
  } catch (error: any) {
    console.error(
      'Jira Integration Error:',
      error.response?.data || error.message,
    );
    throw Error(error.response?.data || error.message);
  }
};
