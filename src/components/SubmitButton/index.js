import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

import styles from './styles';

const SubmitButton = ({onPress, title, style, titleStyle, isLoading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.loginButton, style, {opacity: isLoading ? 0.5 : 1}]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={[styles.text, titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
