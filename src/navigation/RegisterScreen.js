import React, {useEffect} from 'react';

import Register from '@containers/Register';
import {useColorScheme} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Register navigation={navigation} isDarkMode={colorScheme === 'dark'} />
  );
};

export default RegisterScreen;
