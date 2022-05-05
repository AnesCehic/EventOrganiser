import React, {useState, useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Appearance,
} from 'react-native';

import {client} from '@services/apiClient';
import {UserContext} from '@contexts';
import {SubmitButton, BottomStartScreenButton} from '@components';

import stylesStart from '@containers/Start/styles.js';
import {toast} from '@utils';

import Form from './form';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Styles from '../../common/Styles';

const Login = ({navigation}) => {
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

      const {firstName, lastName, email, _id} = user;
      setUserData({
        firstName,
        lastName,
        email,
        _id,
        avatarImg: user?.upload?.files[0]?.signedURL,
      });
      await AsyncStorageLib.setItem('@userId', user._id);
      await AsyncStorageLib.setItem('@user', JSON.stringify(user));
      handleLogin();
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error login]', error);
      setIsLoading(false);
    }
  };

  const render = () => {
    return colorScheme === 'light' ? (
      <ImageBackground
        resizeMode="cover"
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
        <Form
          navigation={navigation}
          submitLogin={login}
          isLoading={isLoading}
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <SubmitButton
            googleLogo
            onPress={() => null}
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
            <Text style={{fontFamily: Styles.Fonts.header, fontWeight: '700'}}>Sign up for an account</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return <>{render()}</>;
};

export default Login;
