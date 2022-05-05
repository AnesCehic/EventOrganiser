import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Appearance,
} from 'react-native';
import BottomStartScreenButton from '../../components/BottomStartScreenButton';

import {Styles} from '@common';

import Form from './form';

import styles from './styles';

const Register = ({navigation}) => {
  const colorScheme = Appearance.getColorScheme();

  const render = () => {
    return colorScheme === 'light' ? (
      <ImageBackground
        source={require('../../assets/background-video.png')}
        style={styles.container}>
        {renderChildren()}
      </ImageBackground>
    ) : (
      <View style={styles.container}>{renderChildren()}</View>
    );
  };

  const renderChildren = () => {
    return (
      <>
        <View style={stylesHelper.image}>
          <Image source={require('../../assets/Home/white.png')} />
        </View>
        <Text style={stylesHelper.header}>Sign up</Text>
        <Form navigation={navigation} />

        <BottomStartScreenButton
          text="Already have an account? Sign in."
          onPress={() => navigation.navigate('Login')}
        />
      </>
    );
  };

  return <>{render()}</>;
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
    fontFamily: Styles.Fonts.headerMedium,
  },
  image: {
    width: '80%',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
});

export default Register;
