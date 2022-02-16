import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

const SubmitButton = ({onPress, title, style, titleStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.loginButton, style]}>
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
