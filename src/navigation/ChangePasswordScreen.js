import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {ChangePassword} from '@containers';
import {HeaderBack} from '@components';

const ChangePasswordScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      //headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return <ChangePassword navigation={navigation} />;
};

export default ChangePasswordScreen;
