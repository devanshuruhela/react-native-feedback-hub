import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LightbulbIcon = ({ size = 16, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 18h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M10 22h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export default LightbulbIcon;
