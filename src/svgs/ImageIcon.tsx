import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const ImageIcon = ({ size = 16, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M8 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke={color} strokeWidth={2} />
    <Path d="M21 17l-6-6-4 4-2-2-4 4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default ImageIcon;
