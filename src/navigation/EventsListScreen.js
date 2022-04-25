import React, {useEffect} from 'react';

import {EventsList} from '@containers';
import {HeaderBack} from '@components';

const EventsListScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // headerLeft: () => {
      //   return <HeaderBack onPress={() => navigation.goBack()} />;
      // },
    });
  }, []);

  return <EventsList navigation={navigation} />;
};

export default EventsListScreen;
