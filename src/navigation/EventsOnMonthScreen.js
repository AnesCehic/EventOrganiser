import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {EventsOnMonth} from '@containers';
import {HeaderBack} from '@components';

const EventsOnMonthScreen = ({route, navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      // headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);
  return <EventsOnMonth navigation={navigation} route={route} />;
};

export default EventsOnMonthScreen;
