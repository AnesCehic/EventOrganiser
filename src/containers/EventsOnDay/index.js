import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';

import {SearchInput} from '@components';
import {LoadingIndicator} from '@components';

import {useEvents} from '../../hooks';

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
    // const date = dayjs(event.start).format('ddd, MMM D, YYYY h:mm A');
    // const time = dayjs(dayjs().subtract(5, 'minute'));
    // const timeFromNow = time.fromNow();
    return (
      <TouchableOpacity
        style={styles.contentItem}
        onPress={() => console.log('EVENT PRESSED')}>
        <Image />
        <Text>Header</Text>
        <Text>
          He'll want to use your yacht, and I don't want this thing smelling
          like fish.
        </Text>
        <Text>8 min ago</Text>
      </TouchableOpacity>
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
