import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {MyEvents} from '@containers';
import {HeaderBack} from '@components';

const MyEventsScreen = ({navigation, route}) => {
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
    <MyEvents
      navigation={navigation}
      route={route}
      isDarkMode={colorScheme === 'dark'}
    />
  );
};

export default MyEventsScreen;
