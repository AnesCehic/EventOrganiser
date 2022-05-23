import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import Login from '@containers/Login';

const LoginScreen = ({navigation}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      headerShown: false,
    });
  }, []);

  return <Login navigation={navigation} isDarkMode={colorScheme === 'dark'} />;
};

export default LoginScreen;
