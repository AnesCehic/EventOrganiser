import React, {useEffect} from 'react';
import dayjs from 'dayjs';

import {EventsOnMonth} from '@containers';

const EventsOnMonthScreen = ({route, navigation}) => {
  const date = route?.params?.date;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${dayjs(date).format('MMMM')} events`,
    });
  }, []);
  return <EventsOnMonth navigation={navigation} route={route} />;
};

export default EventsOnMonthScreen;
