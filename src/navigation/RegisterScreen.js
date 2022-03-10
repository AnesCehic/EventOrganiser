import React, {useEffect} from 'react';

import Register from '@containers/Register';

const RegisterScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <Register navigation={navigation} />;
};

export default RegisterScreen;
