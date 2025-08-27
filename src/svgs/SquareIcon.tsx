import React from 'react';
import Svg, { Rect } from 'react-native-svg';

export const SquareIcon = ({ size = 16, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="6" y="6" width="12" height="12" fill={color} rx="2" />
  </Svg>
);

export default SquareIcon;
