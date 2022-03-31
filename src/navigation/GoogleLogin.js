import React, {useEffect} from 'react';

import {GoogleLogin as GLContainer} from '@containers';

const GoogleLogin = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <GLContainer navigation={navigation} route={route} />;
};

export default GoogleLogin;
