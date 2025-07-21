# 📦 Feedback SDK: Integration Guide

This SDK supports sending user feedback to **Slack**, **Jira**, and **Microsoft Teams** along with optional screenshot or video attachments.

---

## 🧵 Supported Integrations

- [x] Slack
- [x] Jira (Atlassian Cloud)
- [x] Microsoft Teams (Graph API)

---

## 🔐 Integration Setup & Required Credentials

### 1️⃣ Slack Integration

#### ✅ Required Inputs
- Slack **Bot Token**
- Slack **Channel ID**

#### 🔑 Required Bot Scopes

| Scope         | Description                             |
|---------------|-----------------------------------------|
| `chat:write`  | To post feedback messages               |
| `files:write` | To upload screenshot or video files     |

#### 📌 Setup Steps
1. Go to [Slack API Portal](https://api.slack.com/apps)
2. Create a new app or use existing one
3. Under **OAuth & Permissions**, add the required scopes
4. Install the app to your workspace and copy the **Bot Token**
5. Grab your target channel ID from Slack (`Right-click > Copy Channel ID`)

---

### 2️⃣ Jira Integration

#### ✅ Required Inputs
- Jira **Host** (e.g. `yourcompany.atlassian.net`)
- Jira **Email** (associated with API token)
- Jira **API Token**
- Jira **Project Key** and optionally a **custom Issue Type**

#### 🔑 Required Permissions

| Permission         | Description                                  |
|--------------------|----------------------------------------------|
| **Create Issues**  | To open feedback tickets                     |
| **Browse Projects**| To access the project and issue types        |
| **Add Attachments**| To upload screenshots or videos to tickets   |

#### 📌 Setup Steps
1. Visit [Atlassian API Tokens](https://id.atlassian.com/manage/api-tokens)
2. Create a new token and copy it
3. Ensure your user has required project permissions (Admin or Developer)
4. Provide:
   - Your Jira email
   - API token
   - Host (`yourdomain.atlassian.net`)
   - Project key where feedback will be logged

---

### 3️⃣ Microsoft Teams Integration (via Microsoft Graph API)

#### ✅ Required Inputs
- Microsoft **Access Token** (Graph API)
- **Team ID**
- **Channel ID**

#### 🔑 Required Graph API Scopes

| Scope                    | Description                                         |
|--------------------------|-----------------------------------------------------|
| `ChannelMessage.Send`    | Send feedback messages to Teams channels            |
| `Files.ReadWrite.All`    | Upload screenshots/videos to Teams file storage     |
| `Group.ReadWrite.All`    | Access Teams/channel info and manage messages/files |
| `Sites.ReadWrite.All`*   | Required for file uploads to SharePoint             |

#### 📌 Setup Options
- Use [Azure Portal](https://portal.azure.com) to:
  1. Register a new app
  2. Enable Microsoft Graph API
  3. Add the scopes above (delegated or application)
  4. Get OAuth access token for your user/app

> ⚠️ Microsoft Graph is the most complex setup. We recommend using a user-delegated token to keep integration lightweight.

---

## 🚀 Example Usage

```ts
const slackConfig = {
  botToken: 'xoxb-...',
  channelId: 'C123456'
}

const jiraConfig = {
  email: 'your@email.com',
  apiToken: 'abc123',
  host: 'yourdomain.atlassian.net',
  projectKey: 'SDK'
}

const microsftTeamsConfig = {
  accessToken: 'Bearer eyJ0eXAiOiJK...',
  teamId: 'e4d4c9a6-...',
  channelId: '19:abc123@thread.tacv2'
}

// you can add single or multiple supported configs
// Default value for feedbackButtonPosition is bottom: 30 and right: 30
<FeedbackProvider slackConfig={slackConfig} feedbackButtonPosition={{bottom:30, right: 30}}>
    <App/>
</FeedbackProvider>
```

---

## 📎 Attachment Support

Your feedback payload can include:
- `screenshot`: local image URI (e.g. from screen capture)
- `video`: local video URI (e.g. from screen recording)

All platforms will attempt to upload these alongside the feedback text.