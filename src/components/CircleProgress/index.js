import React from 'react';
import {View, Text} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

import {Styles} from '@common';
const CircleProgress = ({
  children,
  percent,
  radius = 100,
  borderWidth = 3,
  color = '#3399FF',
  shadowColor = '#999',
  bgColor = '#fff',
  mainValue,
  bottomValue,
}) => {
  return (
    <ProgressCircle
      percent={percent}
      radius={radius}
      borderWidth={borderWidth}
      color={color}
      shadowColor={shadowColor}
      bgColor={bgColor}>
      <Text style={{fontSize: 24, color: color}}>{mainValue}</Text>
      <Text style={{fontSize: 12, color: shadowColor, top: 10}}>
        {bottomValue}
      </Text>
      {children}
    </ProgressCircle>
  );
};

export default CircleProgress;
