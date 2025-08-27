import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export const CameraIcon = ({ size = 16, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="6" width="18" height="14" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M9 6l1.5-2h3L15 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="13" r="3.5" stroke={color} strokeWidth={2} />
  </Svg>
);

export default CameraIcon;
