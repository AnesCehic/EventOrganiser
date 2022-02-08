import React from 'react';
import {Text, View} from 'react-native';

import {SubmitButton} from '@components';

import styles from './styles';

const Start = ({navigation}) => (
  <View style={styles.container}>
    <SubmitButton
      onPress={() => navigation.navigate('Login')}
      title="Login"
      style={styles.button}
    />
    <SubmitButton
      onPress={() => navigation.navigate('Register')}
      title="Regsiter"
      style={styles.button}
    />
  </View>
);

export default Start;
