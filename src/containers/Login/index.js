import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Form from './form';

import styles from './styles';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Form navigation={navigation} />

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text>No account yet? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
