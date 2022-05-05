import React, {useEffect} from 'react';

import {MyEvents} from '@containers';
import {HeaderBack} from '@components';

const MyEventsScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  return <MyEvents navigation={navigation} route={route} />;
};

export default MyEventsScreen;
