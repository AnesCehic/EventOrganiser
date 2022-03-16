import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {EditProfile} from '@containers';

const EditProfileScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
    });
  }, []);
  return <EditProfile navigation={navigation} />;
};

export default EditProfileScreen;
