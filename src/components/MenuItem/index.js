import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';

import {Icon} from 'react-native-elements';
import {Styles} from '@common';

import styles from './styles';

const MenuItem = ({onPress, menuText}) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.menuItem, colorScheme === 'dark' && styles.menuItemDark]}>
      <Text style={styles.menuItemText}>{menuText}</Text>
      <Icon
        name="keyboard-arrow-right"
        size={24}
        color={Styles.Colors.grayText}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

export default MenuItem;
