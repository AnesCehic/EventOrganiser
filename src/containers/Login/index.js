import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {client} from '@services/apiClient';
import {UserContext} from '@contexts';

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
