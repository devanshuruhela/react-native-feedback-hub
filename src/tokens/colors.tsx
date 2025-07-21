/**
 * Color Tokens for React Native Feedback App
 */

export const colors = {
  gray: {
    50: '#f9fafb',    // Lightest - for primary text on dark backgrounds
    100: '#f3f4f6',   // Very light backgrounds
    200: '#e5e7eb',   // Light borders, dividers
    300: '#d1d5db',   // Secondary text, light borders
    400: '#9ca3af',   // Muted text, placeholders
    500: '#6b7280',   // Medium gray
    600: '#4b5563',   // Input borders, disabled states
    700: '#374151',   // Secondary backgrounds, dark text
    800: '#1f2937',   // Primary dark background
    900: '#111827',   // Darkest backgrounds
  },

  // Background Colors (Using consolidated grays)
  background: {
    primary: '#1f2937',           // gray.800 - Main modal background
    secondary: '#374151',         // gray.700 - Input backgrounds, secondary buttons
    tertiary: '#111827',          // gray.900 - Attachment preview background
    overlay: 'rgba(0,0,0,0.4)',   // Improved contrast for overlay
    overlayLight: 'rgba(0,0,0,0.6)', // Darker overlay for better visibility
  },

  text: {
    primary: '#f9fafb',      // gray.50 - High contrast on dark backgrounds
    secondary: '#d1d5db',    // gray.300 - Good contrast for secondary text
    muted: '#9ca3af',        // gray.400 - Sufficient contrast for placeholders
    inverse: '#374151',      // gray.700 - Dark text on light backgrounds
    white: '#ffffff',        // Pure white
  },


  border: {
    default: '#4b5563',      // gray.600 - Better visibility
    light: '#d1d5db',        // gray.300 - Light borders
    focus: '#3b82f6',        // Blue for focus states
  },


  status: {
    error: {
      text: '#dc2626',       // Better contrast red for text
      textLight: '#b91c1c',  // Darker red for light backgrounds
      background: '#fef2f2', // Light error background
      border: '#fecaca',     // Light error border
    },

    success: {
      text: '#059669',       // Better contrast green for text
      textLight: '#047857',  // Darker green for light backgrounds
      background: '#f0fdf4', // Light success background
      border: '#bbf7d0',     // Light success border
    },

    warning: {
      text: '#d97706',       // Amber for warnings
      background: '#fffbeb', // Light warning background
      border: '#fed7aa',     // Light warning border
    },
  },


  interactive: {
    primary: '#2563eb',          // Improved blue with better contrast
    primaryHover: '#1d4ed8',     // Darker blue for hover states
    primaryDisabled: '#6b7280',  // gray.500 - Better disabled state
    secondary: '#374151',        // gray.700 - Secondary buttons
    secondaryHover: '#4b5563',   // gray.600 - Secondary hover
    
    // Recording states (consolidated similar reds)
    recording: '#dc2626',        // Single red for all recording states
    recordingHover: '#b91c1c',   // Darker red for hover
    
    // Floating button
    floating: '#374151',         // gray.700 - Consistent with secondary
    floatingHover: '#4b5563',    // gray.600 - Hover state
  },


  semantic: {

    bug: {
      text: '#dc2626',       // status.error.text
      background: '#fef2f2', // status.error.background
      border: '#fecaca',     // status.error.border
    },

    suggestion: {
      text: '#059669',       // status.success.text
      background: '#f0fdf4', // status.success.background
      border: '#bbf7d0',     // status.success.border
    },
  },


  legacy: {
    red: '#dc2626',
  },
} as const;

// Type definitions for better TypeScript support
export type ColorTokens = typeof colors;
export type BackgroundColors = keyof typeof colors.background;
export type TextColors = keyof typeof colors.text;
export type BorderColors = keyof typeof colors.border;
export type StatusColors = keyof typeof colors.status;
export type InteractiveColors = keyof typeof colors.interactive;
