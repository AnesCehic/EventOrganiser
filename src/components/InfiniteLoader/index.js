import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const InfiniteLoader = () => {
  const colorScheme = useColorScheme();
  return (
    <ActivityIndicator
      style={styles.loaderMargin}
      size="small"
      color={colorScheme === 'light' ? '$000' : '#b5b5b5'}
    />
  );
};

const styles = StyleSheet.create({
  loaderMargin: {
    margin: 8,
  },
});

export default InfiniteLoader;
