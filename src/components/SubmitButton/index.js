import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const SubmitButton = ({
  onPress,
  title,
  style,
  titleStyle,
  isLoading,
  googleLogo,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.loginButton, style, {opacity: isLoading ? 0.5 : 1}]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View style={styles.textContainer}>
          {googleLogo ? (
            <Icon name="google" size={30} style={styles.logo} />
          ) : null}
          <Text style={[styles.text, titleStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
