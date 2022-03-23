import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-remix-icon';

import styles from './styles';

const HeaderBack = ({
  onPress,
  name = 'ri-arrow-left-line',
  size = 24,
  transparent,
}) => {
  const iconColor = transparent ? '#fff' : '#000';
  const iconBackground = transparent ? 'transparent' : '#fff';
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: iconBackground}]}
      onPress={onPress}>
      <Icon name={name} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

export default HeaderBack;
