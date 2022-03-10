import React, {useEffect} from 'react';
import {Start} from '@containers';

import {Header} from '@components';
import {Styles} from '@common';

const StartScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <Start navigation={navigation} />;
};

export default StartScreen;
