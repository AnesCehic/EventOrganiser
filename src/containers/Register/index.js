import React from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import BottomStartScreenButton from '../../components/BottomStartScreenButton';

import Form from './form';

import styles from './styles';

const Register = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/background-video.png')}
      style={styles.container}>
      <View style={stylesHelper.image}>
        <Image source={require('../../assets/Home/white.png')} />
      </View>
      <Text style={stylesHelper.header}>Sign in to your {'\n'}account</Text>
      <Form navigation={navigation} />

      <BottomStartScreenButton
        text="Already have an account? Sign in."
        onPress={() => navigation.navigate('Login')}
      />
    </ImageBackground>
  );
};

const stylesHelper = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
  forgotPassword: {
    width: '80%',
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    width: '80%',
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: 30,
  },
  image: {
    width: '80%',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
});

export default Register;
