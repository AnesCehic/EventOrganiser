import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {Groups} from '@containers';

const GroupsScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <Groups navigation={navigation} />;
};

export default GroupsScreen;
