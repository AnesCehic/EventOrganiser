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
        avatarImg:
          'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f',
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

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/background-video.png')}
      style={styles.container}>
      <Form navigation={navigation} submitLogin={login} isLoading={isLoading} />

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
