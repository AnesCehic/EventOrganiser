import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

const BottomStartScreenButton = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.registerButton} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default BottomStartScreenButton;
