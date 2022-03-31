import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import dayjs from 'dayjs';
import RenderHTML from 'react-native-render-html';

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
      const monthGte = dayjs(date).startOf('month').format();
      const monthLte = dayjs(date).endOf('month').format();

      const res = await EventService.find({
        query: {
          start: {
            $gte: monthGte,
            $lte: monthLte,
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

  const renderItem = ({item: event}) => {
    const {navigate} = navigation;
    const startDate = dayjs(event.start).format('MMM DD');
    const endDate = dayjs(event.end).format('MMM DD');
    const startTime = dayjs(event.start).format('hh A');
    const location = event.location;
    const imageUrl = event?.upload?.files[0]?.signedURL;
    const title = event.title;
    const description = {
      html: `<section>${event.description}</section>`,
    };
    const source = <RenderHTML contentWidth={10} source={description} />;
    return (
      <EventItem
        onPress={() => {
          navigate('FeedDetails', {
            id: event._id,
          });
        }}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        location={location}
        imageUrl={imageUrl}
        description={source}
        title={title}
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

  return (
    <View style={styles.container}>
      <View style={styles.topImage}>
        <Text style={styles.headerText}>{`${dayjs(date).format(
          'MMMM',
        )} events`}</Text>
      </View>
      <View
        style={{
          padding: 10,
          marginTop: -60,
        }}>
        {renderEventsList()}
      </View>
    </View>
  );
};

export default EventsOnMonth;
