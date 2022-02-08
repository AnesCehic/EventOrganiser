import React, {useEffect} from 'react';

import Login from '@containers/Login';

const LoginScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      title: 'Login',
      headerTitleAlign: 'center',
    });
  }, []);

  return <Login navigation={navigation} />;
};

export default LoginScreen;
