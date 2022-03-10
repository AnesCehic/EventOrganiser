import React, {useEffect} from 'react';

import Login from '@containers/Login';

const LoginScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      headerShown: false,
    });
  }, []);

  return <Login navigation={navigation} />;
};

export default LoginScreen;
