import React, {useState, useContext} from 'react';
import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';

import {client} from '@services/apiClient';
import {UserContext} from '@contexts';
import {SubmitButton, BottomStartScreenButton} from '@components';

import stylesStart from '@containers/Start/styles.js';
import {toast} from '@utils';

import Form from './form';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {setAuthenticated} = useContext(UserContext);
  const handleLogin = () => setAuthenticated(true);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const {user} = await client.authenticate({
        strategy: 'local',
        email: username,
        password: password,
      });

      console.log('here');

      await AsyncStorageLib.setItem('@userId', user._id);
      await AsyncStorageLib.setItem('@user', JSON.stringify(user));
      handleLogin();
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error login]', error);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/background-video.png')}
      style={styles.container}>
      <Form submitLogin={login} isLoading={isLoading} />

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
          <Text>Sign up for an account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
