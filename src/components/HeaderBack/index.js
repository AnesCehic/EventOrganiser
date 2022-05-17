import React from 'react';
import {TouchableOpacity, Appearance} from 'react-native';
import Icon from 'react-native-remix-icon';

import styles from './styles';

const HeaderBack = ({
  onPress,
  name = 'ri-arrow-left-line',
  size = 24,
  // transparent,
}) => {
  const colorScheme = Appearance.getColorScheme();
  // const iconColor = transparent ? '#fff' : '#000';
  // const iconBackground = transparent ? 'transparent' : '#fff';
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <Icon
        name={name}
        size={size}
        color={colorScheme === 'light' ? '#000' : '#b5b5b5'}
      />
    </TouchableOpacity>
  );
};

export default HeaderBack;
