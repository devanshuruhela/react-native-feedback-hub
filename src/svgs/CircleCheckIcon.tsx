import React from 'react';
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg';

export const CircleCheckIcon = ({ size = 15, color = '#22C55E' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <SvgCircle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M9 12l2 2 4-4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default CircleCheckIcon;
