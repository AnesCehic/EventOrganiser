import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {EventsList} from '@containers';

const EventsListScreen = ({navigation}) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <EventsList navigation={navigation} isDarkMode={colorScheme === 'dark'} />
  );
};

export default EventsListScreen;
