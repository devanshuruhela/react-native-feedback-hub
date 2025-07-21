# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-22

### Added
- Initial release of React Native Feedback SDK
- Support for Slack integration with threaded messages and file attachments
- Support for Jira integration with issue creation and file attachments
- Support for Microsoft Teams integration via Graph API
- Screenshot capture functionality using react-native-view-shot
- Screen recording functionality using react-native-record-screen
- Floating feedback button with customizable positioning
- Modal feedback form with bug/suggestion categorization
- Comprehensive TypeScript support with full type definitions
- Accessibility-compliant color system (WCAG AA)
- Consolidated color token system for consistent theming
- Error handling and validation throughout all integrations
- Comprehensive documentation with setup guides for all platforms

### Features
- **Multi-platform Integration**: Slack, Jira, Microsoft Teams
- **Rich Attachments**: Screenshot and video recording support
- **Customizable UI**: Floating button positioning, theming support
- **Type Safety**: Complete TypeScript definitions
- **Accessibility**: WCAG-compliant color system
- **Error Handling**: Robust error boundaries and async error handling
- **Documentation**: Detailed setup guides and API documentation

### Dependencies
- axios: HTTP client for API requests
- lucide-react-native: Icon library
- mime: MIME type detection
- react-native-create-thumbnail: Video thumbnail generation
- react-native-fs: File system operations
- react-native-record-screen: Screen recording functionality
- react-native-view-shot: Screenshot capture functionality

### Peer Dependencies
- react: >=17.0.0
- react-native: >=0.70.0
- react-native-svg: >=12.0.0
