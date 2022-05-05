import React, {useEffect} from 'react';

import {EditProfile} from '@containers';

const EditProfileScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
    });
  }, []);
  return <EditProfile navigation={navigation} />;
};

export default EditProfileScreen;
