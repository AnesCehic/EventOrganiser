import React, {useEffect} from 'react';
import {Text, useColorScheme} from 'react-native';

import {ForgotPassword} from '@containers';
import {HeaderBack} from '@components';

const ForgotPasswordScreen = ({navigation}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      //headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return (
    <ForgotPassword
      navigation={navigation}
      isDarkMode={colorScheme === 'dark'}
    />
  );
};

export default ForgotPasswordScreen;
