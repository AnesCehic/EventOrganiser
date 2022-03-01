import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, ImageBackground} from 'react-native';

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
    <ImageBackground
      source={require('../../assets/background-video.png')}
      resizeMode="cover"
      style={styles.mainContainer}>
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

      <TouchableOpacity style={styles.registerButton}>
        <Text>Register</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Start;
