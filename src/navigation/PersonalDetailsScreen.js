import React, {useEffect} from 'react';

import {PersonalDetails} from '@containers';
import {HeaderBack} from '@components';

const PersonalDetailsScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerStyle: {
        height: '100',
      },
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return <PersonalDetails navigation={navigation} route={route} />;
};

export default PersonalDetailsScreen;
