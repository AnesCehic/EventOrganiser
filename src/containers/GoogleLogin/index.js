import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const GoogleLogin = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.result}</Text>
    </View>
  );
};

export default GoogleLogin;
