import React from 'react';
import {TouchableHighlight, Text} from 'react-native';

import styles from './styles';

const SubmitButton = ({onPress, title, style}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor="rgb(100, 100, 255)"
      style={{...styles.loginButton, ...style}}>
      <Text>{title}</Text>
    </TouchableHighlight>
  );
};

export default SubmitButton;
