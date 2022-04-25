import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {MyEvents} from '@containers';
import {HeaderBack} from '@components';

const MyEventsScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      // headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return <MyEvents navigation={navigation} route={route} />;
};

export default MyEventsScreen;
