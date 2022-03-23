import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {Styles} from '@common';

import {EventsList} from '@containers';

const EventsListScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
    });
  }, []);

  return <EventsList navigation={navigation} />;
};

export default EventsListScreen;
