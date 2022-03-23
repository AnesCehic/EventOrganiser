import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {EditProfile} from '@containers';
import {HeaderBack} from '@components';

const EditProfileScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);
  return <EditProfile navigation={navigation} />;
};

export default EditProfileScreen;
