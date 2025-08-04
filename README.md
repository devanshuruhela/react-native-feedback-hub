# 📦 React Native Feedback Hub

[![npm version](https://badge.fury.io/js/react-native-feedback-hub.svg)](https://badge.fury.io/js/react-native-feedback-hub)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[!["Buy Me A Coffee"](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-orange?logo=buy-me-a-coffee)](https://buymeacoffee.com/devanshuruhela)

A comprehensive React Native SDK for collecting user feedback with seamless integration to **Slack**, **Jira**, **Discord** and **Microsoft Teams**. Features include screenshot capture, screen recording, and customizable UI.

## ✨ Features

- 🚀 **Multi-platform Integration**: Slack, Jira, Discord, Microsoft Teams
- 📸 **Screenshot Capture**: Built-in screenshot functionality
- 🎥 **Screen Recording**: Record user interactions
- 🎨 **Customizable UI**: Floating button positioning
- 📱 **React Native Optimized**: Designed specifically for React Native apps
- 🔒 **Type Safe**: Complete TypeScript support
- ♿ **Accessible**: WCAG AA compliant color system
- 📚 **Well Documented**: Comprehensive setup guides

## 📦 Installation

```bash
npm install react-native-feedback-hub
# or
yarn add react-native-feedback-hub
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react-native-svg react-native-fs react-native-view-shot react-native-record-screen react-native-create-thumbnail
# or 
yarn add react-native-svg react-native-fs react-native-view-shot react-native-record-screen react-native-create-thumbnail
```

If IOS build fails due to react-native-record-screen:
Use [Patch](https://github.com/devanshuruhela/react-native-feedback-hub/blob/main/patches/react-native-record-screen%2B0.6.2.patch)

### Platform Setup

For iOS, add the following permissions to your `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to capture screenshots</string>
```

For Android, add the following permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

---

## 🧵 Supported Integrations

- [x] Slack
- [x] Jira (Atlassian Cloud)
- [x] Microsoft Teams (Graph API)
- [x] Discord (Webhook URL)
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

### 3️⃣ Discord Integration

#### ✅ Required Inputs
- Discord **Webhook URL**

#### 📌 Setup
1. Go to your Discord server settings
2. Click on Integrations
3. Create a new Webhook
4. Select the channel you want to post messages to
5. Copy the Webhook URL

---

### 4️⃣ Microsoft Teams Integration (via Microsoft Graph API)

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

const discordConfig = {
  webhookUrl: 'https://discord.com/api/webhooks/12345.....'
}

const config = {
  slackConfig,
  jiraConfig,
  microsoftTeamsConfig,
  discordConfig,
};

// you can add single or multiple supported configs
// Default value for feedbackButtonPosition is bottom: 30 and right: 30
import { FeedbackHubProvider } from 'react-native-feedback-hub';

<FeedbackHubProvider 
  config={config}
  feedbackButtonPosition={{bottom:30, right: 30}} 
  additionInfo={`UserId:${data.userId}`} // You can send addition Info along with feedback Detail
  enabled={condition...} // pass true to enable for All users
>
    <App/>
</FeedbackHubProvider>

```

---

## 📎 Attachment Support

Your feedback payload can include:
- `screenshot`: local image URI (e.g. from screen capture)
- `video`: local video URI (e.g. from screen recording)

All platforms will attempt to upload these alongside the feedback text.