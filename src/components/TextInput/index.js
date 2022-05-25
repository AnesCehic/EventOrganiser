import React, {forwardRef} from 'react';
import {TextInput, useColorScheme} from 'react-native';

import styles from './styles';

const CustomTextInput = forwardRef(
  (
    {
      placeholder,
      secureTextEntry,
      value,
      onChangeValue,
      multiline,
      style,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useColorScheme();
    return (
      <TextInput
        value={value}
        style={[
          styles.textInput,
          {paddingTop: multiline ? 15 : null},
          style,
          colorScheme === 'dark' && styles.textInputDark,
        ]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeValue}
        multiline={multiline}
        ref={ref}
        {...props}
      />
    );
  },
);

export default CustomTextInput;
