# Microsoft Teams Integration Guide

## Overview

This guide explains how to integrate Microsoft Teams to send feedback messages (including screenshots or video recordings) directly to a Teams channel.

## Prerequisites

- A Microsoft Entra ID (Azure AD) tenant
- Microsoft Teams workspace with at least one team and channel
- Access to Microsoft Graph API with delegated permissions
- An app registered in Azure AD with appropriate permissions

## Required Info

To integrate successfully, you'll need:

- `A user profile with required permissions on behalf of which the app will send messages. Name it something like "Feedback Bot"`
- `accessToken` (OAuth 2.0 device flow token)
- `teamId`
- `channelId`

## How to Generate Access Token

1. Register an app at: [https://portal.azure.com](https://portal.azure.com) → Azure Active Directory → App registrations

2. Note the `Client ID and Tenant ID` from app overview

3. Enable `Delegated` Microsoft Graph API permissions and grant admin consent:

| Permission | Type | Description |
|------------|------|-------------|
| `ChannelMessage.Send` | Delegated | Send messages to Teams channels |
| `Files.ReadWrite.All` | Delegated | Read and write files to Teams/SharePoint |
| `Team.ReadBasic.All` | Delegated | Read basic team and channel info |
| `Group.ReadWrite.All` | Delegated | Access Teams/channel info and manage messages |
| `Sites.ReadWrite.All` | Delegated | Required for file uploads to SharePoint |
| `User.Read` | Delegated | Read basic user profile |

4. Get Access Token:

```bash
curl -X POST https://login.microsoftonline.com/common/oauth2/v2.0/devicecode \
 -d 'client_id=<YOUR_CLIENT_ID>&scope=https://graph.microsoft.com/.default offline_access openid profile'
```

Follow the URL shown in the response and enter the user code.

Then exchange the code:

```bash
curl -X POST https://login.microsoftonline.com/common/oauth2/v2.0/token \
 -d 'client_id=<YOUR_CLIENT_ID>&grant_type=device_code&device_code=<CODE_FROM_ABOVE>'
```

## How to Get `teamId` and `channelId` from Invite Link

If your Teams invite link looks like this:

```
https://teams.microsoft.com/l/channel/19%3aabcXYZ%40thread.tacv2/General?groupId=12345678-90ab-cdef-1234-567890abcdef&tenantId=abcdef12-3456-7890-abcd-ef1234567890
```

Then:

- `teamId = groupId = 12345678-90ab-cdef-1234-567890abcdef`
- `channelId = 19%3aabcXYZ%40thread.tacv2`
- `accessToken = eydsa.....324sdf`

Pass them into config to start logging bugs and suggestions.

---

For help or questions, reach out to your Microsoft 365 administrator or check: [https://learn.microsoft.com/en-us/graph/overview](https://learn.microsoft.com/en-us/graph/overview)
