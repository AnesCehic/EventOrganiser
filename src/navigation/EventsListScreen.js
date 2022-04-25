import React, {useEffect} from 'react';

import {EventsList} from '@containers';

const EventsListScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <EventsList navigation={navigation} />;
};

export default EventsListScreen;
