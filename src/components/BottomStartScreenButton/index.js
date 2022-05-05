import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Styles from '../../common/Styles';

import styles from './styles';

const BottomStartScreenButton = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.registerButton} onPress={onPress}>
      <Text style={{fontWeight: '600'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BottomStartScreenButton;
