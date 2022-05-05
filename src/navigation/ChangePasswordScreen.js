import React, {useEffect} from 'react';

import {ChangePassword} from '@containers';
import {HeaderBack} from '@components';

const ChangePasswordScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return <ChangePassword navigation={navigation} />;
};

export default ChangePasswordScreen;
