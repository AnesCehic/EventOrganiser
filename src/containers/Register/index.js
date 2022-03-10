import React from 'react';
import {View, Text} from 'react-native';
import BottomStartScreenButton from '../../components/BottomStartScreenButton';

import Form from './form';

import styles from './styles';

const Register = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Form navigation={navigation} />

      <BottomStartScreenButton
        text="Already have an account? Sign in."
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Register;
