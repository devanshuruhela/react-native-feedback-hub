import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const VideoIcon = ({ size = 16, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="2" y="6" width="14" height="12" rx="2" stroke={color} strokeWidth={2} />
  </Svg>
);

export default VideoIcon;
