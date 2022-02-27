import React, {useEffect} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import dayjs from 'dayjs';

import {SearchInput} from '@components';
import {EventItem, LoadingIndicator} from '@components';

import {useEvents} from '@hooks';

import styles from './styles';

const EventsOnDay = ({route, navigation}) => {
  const eventsDate = route.params.date;
  const {events, eventsError, eventsLoading, refetch} = useEvents(eventsDate);
  console.log('EVENTS', events);
  useEffect(() => {
    if (eventsError) {
      //toast here
    }
  }, [eventsError]);

  const renderItem = ({item: event}) => {
    const date = dayjs(event.start).format('ddd, MMM D, YYYY h:mm A');
    return (
      <EventItem
        containerStyle={styles.eventItemContainer}
        date={date}
        img={event.img}
        name={event.title}
        location={event.location}
      />
    );
  };

  const renderEventsList = () => {
    return (
      <FlatList
        style={styles.eventList}
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={eventsLoading}
            onRefresh={handleRefresh}
          />
        }
      />
    );
  };

  const handleRefresh = () => {
    refetch({}); // trigger refetch from hook
  };

  if (eventsLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <SearchInput />
      {renderEventsList()}
    </View>
  );
};

export default EventsOnDay;
