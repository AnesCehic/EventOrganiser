import React from 'react';
import {TextInput} from 'react-native';

import styles from './styles';

const CustomTextInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeValue,
}) => {
  return (
    <TextInput
      value={value}
      style={styles.textInput}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeValue}
    />
  );
};

export default CustomTextInput;
