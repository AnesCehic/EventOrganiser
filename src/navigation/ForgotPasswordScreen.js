import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {ForgotPassword} from '@containers';
import {HeaderBack} from '@components';

const ForgotPasswordScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      //headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return <ForgotPassword navigation={navigation} />;
};

export default ForgotPasswordScreen;
