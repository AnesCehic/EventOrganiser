import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {PersonalDetails} from '@containers';
import {HeaderBack} from '@components';

const PersonalDetailsScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      //headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return <PersonalDetails navigation={navigation} route={route} />;
};

export default PersonalDetailsScreen;
