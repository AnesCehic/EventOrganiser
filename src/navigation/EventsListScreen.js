import React, {useEffect} from 'react';

import {Styles} from '@common';

import {EventsList} from '@containers';
import {Header} from '@components';

const EventsListScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      header: ({navigation: {goBack}}) => (
        <Header
          goBack={goBack}
          backgroundColor={Styles.Colors.white}
          title="Events List"
        />
      ),
    });
  }, []);

  return <EventsList navigation={navigation} />;
};

export default EventsListScreen;
