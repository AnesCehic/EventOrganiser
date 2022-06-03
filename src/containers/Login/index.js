import React, {useState, useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Appearance,
  Platform,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

import {client} from '@services/apiClient';
import {UserContext} from '@contexts';
import {SubmitButton, BottomStartScreenButton} from '@components';

import stylesStart from '@containers/Start/styles.js';
import {toast} from '@utils';

import Form from './form';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Styles from '../../common/Styles';
import {UploadsService, DevicesService} from '../../services/apiClient';

import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

const Login = ({navigation, isDarkMode}) => {
  const colorScheme = Appearance.getColorScheme();
  const [isLoading, setIsLoading] = useState(false);

  const {setAuthenticated, setUserData} = useContext(UserContext);
  const handleLogin = () => setAuthenticated(true);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const {user} = await client.authenticate({
        strategy: 'local',
        email: username,
        password: password,
      });

      const token = await messaging().getToken();
      const uniqueId = DeviceInfo.getUniqueId();
      const brand = DeviceInfo.getBrand();

      const res = await DevicesService.create({
        token,
        os: Platform.OS,
        uniqueId,
        brand,
      });

      let upload = null;
      if (user.uploadId) {
        upload = await UploadsService.get(user.uploadId);
      }

      const {firstName, lastName, email, _id} = user;
      setUserData({
        firstName,
        lastName,
        email,
        _id,
        avatarImg: upload?.files[0]?.signedURL,
      });
      await AsyncStorageLib.setItem('@userId', user._id);
      await AsyncStorageLib.setItem('@user', JSON.stringify(user));
      handleLogin();
      //navigation.navigate('Home');
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error login]', error);
      setIsLoading(false);
    }
  };

  const render = () => {
    return (
      <ImageBackground
        resizeMode="cover"
        source={require('../../assets/background-video.png')}
        style={styles.container}>
        {renderChildren()}
      </ImageBackground>
    );
    // (
    //   <View style={styles.container}>{renderChildren()}</View>
    // );
  };

  const renderChildren = () => {
    return (
      <>
        <View
          style={[
            {
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              opacity: 0.5,
            },
            isDarkMode && {backgroundColor: '#273038'},
          ]}
        />
        <Form
          navigation={navigation}
          submitLogin={login}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <SubmitButton
            googleLogo
            onPress={() => {
              return null;
            }}
            style={{
              ...stylesStart.googleButton,
              ...styles.logInWithGoogle,
              marginBottom: 20,
            }}
            titleStyle={{
              ...stylesStart.googleTextStyle,
              ...styles.logInWithGoogleText,
            }}
            title="Sign in with Google instead"
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={{fontFamily: Styles.Fonts.header, fontWeight: '700'}}>
              Sign up for an account
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return <>{render()}</>;
};

export default Login;
