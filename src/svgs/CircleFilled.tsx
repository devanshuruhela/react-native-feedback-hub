import React from 'react';
import Svg, { Circle as SvgCircle } from 'react-native-svg';

export const CircleFilled = ({ size = 12, color = '#000' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <SvgCircle cx="12" cy="12" r="6" fill={color} />
  </Svg>
);

export default CircleFilled;
