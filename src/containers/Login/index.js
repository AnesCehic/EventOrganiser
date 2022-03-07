import React, {useState, useContext} from 'react';
import {View, KeyboardAvoidingViewBase} from 'react-native';

import {client} from '@services/apiClient';
import {UserContext} from '@contexts';
import {SubmitButton, BottomStartScreenButton} from '@components';

import stylesStart from '@containers/Start/styles.js';

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

      await AsyncStorageLib.setItem('@userId', user._id);
      setIsLoading(false);
      handleLogin();
    } catch (error) {
      setIsLoading(false);
      console.log('[Error login]', error);
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
