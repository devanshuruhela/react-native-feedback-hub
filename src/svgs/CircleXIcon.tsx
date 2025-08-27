import React from 'react';
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg';

export const CircleXIcon = ({ size = 15, color = '#EF4444' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <SvgCircle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M15 9l-6 6M9 9l6 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export default CircleXIcon;
