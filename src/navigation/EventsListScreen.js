import React, {useEffect} from 'react';

import {Styles} from '@common';

import {EventsList} from '@containers';
import {Header} from '@components';

const EventsListScreen = ({navigation}) => {
  return <EventsList navigation={navigation} />;
};

export default EventsListScreen;
