import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {EventsOnMonth} from '@containers';
import {HeaderBack} from '@components';

const EventsOnMonthScreen = ({route, navigation}) => {
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
    <EventsOnMonth
      navigation={navigation}
      route={route}
      isDarkMode={colorScheme === 'dark'}
    />
  );
};

export default EventsOnMonthScreen;
