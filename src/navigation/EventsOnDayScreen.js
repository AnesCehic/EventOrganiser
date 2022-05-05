import React, {useEffect} from 'react';

import {EventsOnDay} from '@containers';
import {HeaderBack} from '@components';

const EventsOnDayScreen = ({route, navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);
  return <EventsOnDay navigation={navigation} route={route} />;
};

export default EventsOnDayScreen;
