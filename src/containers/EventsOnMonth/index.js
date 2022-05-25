import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import RenderHTML from 'react-native-render-html';

import {LoadingIndicator, EventItem} from '@components';
import {toast} from '@utils';
import {Styles} from '@common';

import {EventService} from '@services/apiClient';

import styles from './styles';

const EventsOnMonth = ({route, navigation, isDarkMode}) => {
  const date = route?.params?.date;

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(3);

  useEffect(() => {
    getEventsOnMonth();
  }, []);

  const getEventsOnMonth = async () => {
    try {
      // setIsLoading(true);
      if (total < limit) {
        return;
      }
      const monthGte = dayjs(date).startOf('month').format();
      const monthLte = dayjs(date).endOf('month').format();
      const res = await EventService.find({
        query: {
          start: {
            $gte: monthGte,
            $lte: monthLte,
          },
          $limit: limit,
          $skip: skip,
        },
      });

      setTotal(events.total);
      setSkip(limit);
      const limitCalc = limit * 2 > events.total ? events.total : limit * 2;
      setLimit(limitCalc);

      setEvents([...events, ...res.data]);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error get events on month]', error);
    }
  };

  const renderEventsList = () => {
    return (
      <FlatList
        style={styles.eventList}
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={loadMore}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        // }
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const loadMore = () => {
    getEventsOnMonth();
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
      text: event.description
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/&([^;]+);/gi, ''),
    };
    const source = (
      <Text style={isDarkMode && {color: '#E6EBF0'}}>
        {description.text.substring(0, 85)}...
      </Text>
    );
    return (
      <EventItem
        onPress={() => {
          navigate('FeedDetails', {
            id: event._id,
          });
        }}
        isDarkMode={isDarkMode}
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
    <View
      style={[styles.container, isDarkMode && {backgroundColor: '#0A121A'}]}>
      <View
        style={[
          styles.topImage,
          {
            backgroundColor: isDarkMode
              ? Styles.Colors.headerBackgroundDark
              : Styles.Colors.headerBackground,
          },
        ]}>
        <Text style={styles.headerText}>{`${dayjs(date).format(
          'MMMM',
        )} events`}</Text>
      </View>
      <View
        style={{
          padding: 10,
          marginTop: -70,
          flex: 1,
        }}>
        {renderEventsList()}
      </View>
    </View>
  );
};

export default EventsOnMonth;
