import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {PersonalDetails} from '@containers';

const PersonalDetailsScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
    });
  }, []);

  return <PersonalDetails navigation={navigation} route={route} />;
};

export default PersonalDetailsScreen;
