import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Styles} from '@common';

const LoadingIndicator = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' && styles.containerDarkBackground,
      ]}>
      <ActivityIndicator
        size="large"
        color={
          colorScheme === 'dark' ? Styles.Colors.white : Styles.Colors.black
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.Colors.white,
  },
  containerDarkBackground: {
    backgroundColor: '#0A121A',
  },
});

export default LoadingIndicator;
