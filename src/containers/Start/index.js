import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, ImageBackground} from 'react-native';

import {SubmitButton, BottomStartScreenButton} from '@components';

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
      <View style={styles.headerContainer}>
        <Text style={styles.headers}>Welcome to{'\n'}Lincoln Club</Text>
      </View>
      <View style={styles.container}>
        <SubmitButton
          onPress={() => navigation.navigate('Login')}
          title="Sign in with Google"
          style={styles.googleButton}
          googleLogo
          titleStyle={styles.googleTextStyle}
        />
        <SubmitButton
          onPress={() => navigation.navigate('Login')}
          title="Sign in with email"
          style={styles.button}
          titleStyle={styles.textStyle}
        />
      </View>

      <BottomStartScreenButton
        onPress={() => navigation.navigate('Register')}
        text="Sign up for an account"
      />
    </ImageBackground>
  );
};

export default Start;
