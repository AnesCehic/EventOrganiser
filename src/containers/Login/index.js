import React, {useState, useContext} from 'react';
import {View, KeyboardAvoidingViewBase} from 'react-native';

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
      handleLogin();
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error login]', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Form submitLogin={login} isLoading={isLoading} />

      <SubmitButton
        googleLogo
        onPress={() => null}
        style={{...stylesStart.googleButton, ...styles.logInWithGoogle}}
        titleStyle={{
          ...stylesStart.googleTextStyle,
          ...styles.logInWithGoogleText,
        }}
        title="Sign in with Google instead"
      />
    </View>
  );
};

export default Login;
