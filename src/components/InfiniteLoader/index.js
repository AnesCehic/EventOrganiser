import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const InfiniteLoader = () => {
  return (
    <ActivityIndicator style={styles.loaderMargin} size="small" color="black" />
  );
};

const styles = StyleSheet.create({
  loaderMargin: {
    margin: 8,
  },
});

export default InfiniteLoader;
