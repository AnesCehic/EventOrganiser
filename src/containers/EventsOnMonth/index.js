import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import dayjs from 'dayjs';

import {LoadingIndicator, EventItem} from '@components';

import {EventService} from '@services/apiClient';

import styles from './styles';

const EventsOnMonth = ({route, navigation}) => {
  const date = route?.params?.date;

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsOnMonth();
  }, []);

  const getEventsOnMonth = async () => {
    try {
      setIsLoading(true);
      const res = await EventService.find({
        query: {
          start: {
            $gte: new Date(date),
          },
        },
      });
      setEvents(res.data);
    } catch (error) {
      console.log('[Error get events on month]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEventsList = () => {
    return (
      <FlatList
        style={styles.eventList}
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      />
    );
  };

  const renderItem = ({item: post}) => {
    const {navigate} = navigation;
    console.log('post aaaaa', post);
    return (
      <EventItem
        onPress={() => {
          navigate('FeedDetails', {
            id: post._id,
          });
        }}
        date={post.start}
        location={post.location}
        name={post.title}
      />
    );
  };

  const handleRefresh = () => {
    getEventsOnMonth();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (events.length === 0) {
    return (
      <View style={styles.noEvents}>
        <Text style={styles.noEventsText}>
          No events in {dayjs(date).format('MMMM')}
        </Text>
      </View>
    );
  }

  return <View style={styles.container}>{renderEventsList()}</View>;
};

export default EventsOnMonth;
