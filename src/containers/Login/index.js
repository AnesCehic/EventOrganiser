import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {client} from '../../services/apiClient';

import Form from './form';

import styles from './styles';

const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      await client.authenticate({
        strategy: 'local',
        email: username,
        password: password,
      });
      setIsLoading(false);
      navigateToHome();
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        onPress: () => Toast.hide(),
      });
      console.log('[Error login]', error);
    }
  };

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Form submitLogin={login} isLoading={isLoading} />
      <Toast />
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text>No account yet? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
