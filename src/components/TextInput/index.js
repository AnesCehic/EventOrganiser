import React from 'react';
import {TextInput} from 'react-native';

import styles from './styles';

const CustomTextInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeValue,
  multiline,
  style,
  ...props
}) => {
  return (
    <TextInput
      value={value}
      style={[styles.textInput, {paddingTop: multiline ? 15 : null}, style]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeValue}
      multiline={multiline}
      {...props}
    />
  );
};

export default CustomTextInput;
