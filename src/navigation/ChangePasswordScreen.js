import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {ChangePassword} from '../containers';

const ChangePasswordScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Change password',
      headerTitleAlign: 'center',
    });
  }, []);

  return <ChangePassword navigation={navigation} />;
};

export default ChangePasswordScreen;
