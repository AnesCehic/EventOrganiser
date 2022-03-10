import React from 'react';
import {Text, View} from 'react-native';

import {VerifyAccount} from '@containers';

const VerifyAccountScreen = ({navigation, route}) => {
  return <VerifyAccount navigation={navigation} route={route} />;
};

export default VerifyAccountScreen;
