import React from 'react';
import {Text, Image, View, ImageBackground, Appearance} from 'react-native';

import {SubmitButton, BottomStartScreenButton} from '@components';

import styles from './styles';

const Start = ({navigation}) => {
  const colorScheme = Appearance.getColorScheme();

  const render = () => {
    return colorScheme === 'light' ? (
      <ImageBackground
        source={require('../../assets/background-video.png')}
        resizeMode="cover"
        style={styles.mainContainer}>
        {renderChildren()}
      </ImageBackground>
    ) : (
      <View style={styles.mainContainer}>{renderChildren()}</View>
    );
  };

  const renderChildren = () => {
    return (
      <>
        <Image
          source={require('../../assets/Home/white.png')}
          style={styles.lincolnImage}
        />
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
      </>
    );
  };
  return <>{render()}</>;
};

export default Start;
