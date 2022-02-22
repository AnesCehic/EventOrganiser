import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import {SubmitButton} from '@components';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Start = ({navigation}) => {
  useEffect(() => {
    getJwtToken();
  }, []);

  const getJwtToken = async () => {
    try {
      const res = await AsyncStorageLib.getItem('feathers-jwt');
    } catch (error) {
      console.log('[Error get jwt token]', error);
    }
  };

  return (
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
};

export default Start;
