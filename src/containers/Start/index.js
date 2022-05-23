import React, {useState} from 'react';
import {Text, Image, View, ImageBackground, Appearance} from 'react-native';
import Video from 'react-native-video';

import {SubmitButton, BottomStartScreenButton} from '@components';

import styles from './styles';
import Styles from '../../common/Styles';

const Start = ({navigation}) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const colorScheme = Appearance.getColorScheme();

  const render = () => {
    return (
      <ImageBackground
        source={require('../../assets/background-video.png')}
        resizeMode="cover"
        style={styles.mainContainer}>
        {renderChildren()}
      </ImageBackground>
    );
  };

  const renderChildren = () => (
    <>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: 0.7,
          backgroundColor: 'white',
        }}>
        <Video
          source={{
            uri: 'https://storage.googleapis.com/lincoln-club-community-app-assets/login-video-background.mp4',
          }}
          onLoad={() => setVideoLoading(false)}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0.5,
          }}
          muted={true}
          repeat={true}
          rate={1.0}
          resizeMode="cover"
          ignoreSilentSwitch={'obey'}
        />
      </View>
      <View
        style={[
          styles.overlay,
          {opacity: videoLoading ? 1 : 0.5},
          colorScheme === 'dark' && {backgroundColor: 'black'},
        ]}
      />
      {videoLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../assets/Home/white.png')} />
        </View>
      ) : (
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
              style={[
                styles.button,
                colorScheme === 'dark' && {backgroundColor: '#273038'},
              ]}
              titleStyle={[
                styles.textStyle,
                colorScheme === 'dark' && {color: Styles.Colors.white},
              ]}
            />
          </View>
        </>
      )}

      {videoLoading ? null : (
        <BottomStartScreenButton
          onPress={() => navigation.navigate('Register')}
          text="Sign up for an account"
        />
      )}
    </>
  );
  return <>{render()}</>;
};

export default Start;
