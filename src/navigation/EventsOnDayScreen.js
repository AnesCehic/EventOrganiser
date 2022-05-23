import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {EventsOnDay} from '@containers';
import {HeaderBack} from '@components';

const EventsOnDayScreen = ({route, navigation}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);
  return (
    <EventsOnDay
      navigation={navigation}
      route={route}
      isDarkMode={colorScheme === 'dark'}
    />
  );
};

export default EventsOnDayScreen;
