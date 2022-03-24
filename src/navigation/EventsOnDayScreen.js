import React, {useEffect} from 'react';
import {Text} from 'react-native';
import dayjs from 'dayjs';

import {EventsOnDay} from '@containers';
import {HeaderBack} from '@components';

const EventsOnDayScreen = ({route, navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);
  return <EventsOnDay navigation={navigation} route={route} />;
};

export default EventsOnDayScreen;
