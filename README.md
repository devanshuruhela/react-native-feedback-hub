# 📦 React Native Feedbacks

[![npm version](https://badge.fury.io/js/react-native-feedbacks.svg)](https://badge.fury.io/js/react-native-feedbacks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive React Native SDK for collecting user feedback with seamless integration to **Slack**, **Jira**, and **Microsoft Teams**. Features include screenshot capture, screen recording, and customizable UI.

## ✨ Features

- 🚀 **Multi-platform Integration**: Slack, Jira, Microsoft Teams
- 📸 **Screenshot Capture**: Built-in screenshot functionality
- 🎥 **Screen Recording**: Record user interactions
- 🎨 **Customizable UI**: Floating button positioning
- 📱 **React Native Optimized**: Designed specifically for React Native apps
- 🔒 **Type Safe**: Complete TypeScript support
- ♿ **Accessible**: WCAG AA compliant color system
- 📚 **Well Documented**: Comprehensive setup guides

## 📦 Installation

```bash
npm install react-native-feedbacks
# or
yarn add react-native-feedbacks
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react-native-svg react-native-fs react-native-view-shot react-native-record-screen react-native-create-thumbnail
# or 
yarn add react-native-svg react-native-fs react-native-view-shot react-native-record-screen react-native-create-thumbnail
```

### Platform Setup

For iOS, add the following permissions to your `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to capture screenshots</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to photo library to save screenshots</string>
```

For Android, add the following permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

---

## 🧵 Supported Integrations

- [x] Slack
- [x] Jira (Atlassian Cloud)
- [x] Microsoft Teams (Graph API)
- [ ] Discord _(upcoming)_
- [ ] Zendesk _(upcoming)_
- [ ] Trello _(upcoming)_

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
5. Grab your target channel ID from Slack (`Channel Info > Copy Channel ID`)
6. Add App to the channel.
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

#### 📌 Setup
For detailed setup instructions, see [Microsoft Teams Integration Guide](./microsoft_teams_integration_readme.md).

> ⚠️ Microsoft Graph is the most complex setup. We recommend using a user-delegated token to keep integration lightweight.

---

## 🚀 Example Usage

```ts
const slackConfig = {
  botToken: 'xoxb-...',
  channelId: 'C123456',
};

const jiraConfig = {
  email: 'your@email.com',
  apiToken: 'abc123',
  host: 'yourdomain.atlassian.net',
  projectKey: 'SDK',
};

const microsoftTeamsConfig = {
  accessToken: 'Bearer eyJ0eXAiOiJK...',
  teamId: 'e4d4c9a6-...',
  channelId: '19:abc123@thread.tacv2',
};

const config = {
  slackConfig,
  jiraConfig,
  microsoftTeamsConfig,
};

// you can add single or multiple supported configs
// Default value for feedbackButtonPosition is bottom: 30 and right: 30

<FeedbackProvider 
  config={config}
  feedbackButtonPosition={{bottom:30, right: 30}} 
  enabled={condition...} // pass true to enable for All users
>
    <App/>
</FeedbackProvider>

```

---

## 📎 Attachment Support

Your feedback payload can include:
- `screenshot`: local image URI (e.g. from screen capture)
- `video`: local video URI (e.g. from screen recording)

All platforms will attempt to upload these alongside the feedback text.