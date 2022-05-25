import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import dayjs from 'dayjs';
import RenderHTML from 'react-native-render-html';

import {LoadingIndicator, EventItem} from '@components';
import {toast} from '@utils';
import {Styles} from '@common';

import {EventService} from '@services/apiClient';

import styles from './styles';

const EventsOnDay = ({route, navigation, isDarkMode}) => {
  const day = route?.params?.day;

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(3);

  useEffect(() => {
    getEventsOnDay();
  }, []);

  const getEventsOnDay = async () => {
    try {
      // setIsLoading(true);
      if (total < limit) {
        return;
      }
      const dayGt = dayjs(day).subtract(1, 'day').format();
      const dayLt = dayjs(day).add(1, 'day').format();
      const res = await EventService.find({
        query: {
          start: {
            $gt: dayGt,
            $lt: dayLt,
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
    } finally {
      // setIsLoading(false);
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
      />
    );
  };

  const loadMore = () => {
    getEventsOnDay();
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
    const source = <Text>{description.text.substring(0, 85)}...</Text>;
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
    getEventsOnDay();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (events.length === 0) {
    return (
      <View style={styles.noEvents}>
        <Text style={styles.noEventsText}>
          No events in {dayjs(day).format('MMMM')}
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
        ]}
        source={require('../../assets/headerBackground.png')}
        resizeMode="cover">
        <Text style={styles.headerText}>{`${dayjs(day).format(
          'MMMM DD',
        )}, Events`}</Text>
      </View>
      <View
        style={{
          padding: 10,
          marginTop: -80,
          flex: 1,
        }}>
        {renderEventsList()}
      </View>
    </View>
  );
};

export default EventsOnDay;
