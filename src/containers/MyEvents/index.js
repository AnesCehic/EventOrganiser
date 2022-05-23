import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import RenderHTML from 'react-native-render-html';
import dayjs from 'dayjs';

import {LoadingIndicator, InfiniteLoader} from '@components';
import {toast} from '@utils';

import {EventService} from '@services/apiClient';

import styles from './styles';

const MyEvents = ({navigation, route, isDarkMode}) => {
  const myEventIds = route.params?.ids;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInfinite, setIsLoadingInfinite] = useState(false);
  const [myEvents, setMyEvents] = useState([]);

  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    getMyEvents();
  }, []);

  useEffect(() => {
    if (isLoading) {
      getMyEvents();
    }
  }, [isLoading]);

  const getMyEvents = async () => {
    try {
      // setIsLoading(true);
      if (total < limit) {
        return;
      }

      if (myEvents.length >= total) {
        setIsLoadingInfinite(false);
        return;
      }

      const eventsToShow = await EventService.find({
        query: {
          start: {
            $gte: new Date(),
          },
          _id: {
            $in: myEventIds,
          },
          $limit: limit,
          $skip: skip,
        },
      });

      setTotal(eventsToShow.total);
      setSkip(limit);
      const limitCalc =
        limit * 2 > eventsToShow.total ? eventsToShow.total : limit * 2;
      setLimit(limitCalc);

      setMyEvents([...myEvents, ...eventsToShow.data]);
      setIsLoading(false);
      setIsLoadingInfinite(false);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error get events]', error);
    }
  };

  const renderEventsList = () => {
    return (
      <FlatList
        data={myEvents}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          setIsLoadingInfinite(true);
          loadMore();
        }}
      />
    );
  };

  const loadMore = () => {
    getMyEvents();
  };

  const renderItem = ({item: event}) => {
    const startDate = dayjs(event.start).format('MMM DD');
    const endDate = dayjs(event.end).format('MMM DD');
    const startTime = dayjs(event.start).format('hh A');
    const location = event.location;
    const imageUrl = event?.upload?.files[0]?.signedURL;
    const source = {
      html: `<section>${event.description}</section>`,
      text: event.description
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/&([^;]+);/gi, ''),
    };
    return (
      <TouchableOpacity
        style={[styles.eventsListItemContainer, isDarkMode && {borderWidth: 0}]}
        onPress={() => {
          navigateToEvent(event._id);
        }}>
        <View style={styles.eventsListItemImageWrapper}>
          <Image
            source={{uri: imageUrl}}
            style={styles.eventsListItemImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.eventsListItemTopWrapper}>
          <Text style={styles.eventListItemTitle}>{event.title}</Text>
          <Text>{source.text.substring(0, 85)}...</Text>
        </View>
        <View style={styles.eventListItemDateAndTimeWrapper}>
          <View style={styles.eventListItemDateAndTime}>
            <Icon name="ri-time-line" color="#BFBB85" size={22} />
            <Text style={styles.eventListDateAndTimeText}>
              {startDate} - {endDate} • {startTime}
            </Text>
          </View>
          <View style={styles.eventListItemDateAndTime}>
            <Icon name="ri-map-pin-2-line" color="#BFBB85" size={22} />
            <Text style={styles.eventListDateAndTimeText}>{location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const navigateToEvent = id => {
    navigation.navigate('FeedDetails', {
      id: id,
    });
  };

  const handleRefresh = () => {
    setMyEvents([]);
    setLimit(5);
    setSkip(0);
    setTotal(10);
    setIsLoading(true);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={[styles.container, isDarkMode && {backgroundColor: '#0A121A'}]}>
      <ImageBackground style={styles.topImage}>
        <Text style={styles.headerText}>My Events</Text>
      </ImageBackground>
      <View
        style={{
          padding: 10,
          paddingTop: 0,
          marginTop: -70,
          flex: 1,
        }}>
        {renderEventsList()}
        {isLoadingInfinite && myEvents.length < total ? (
          <View
            style={{
              marginBottom: 10,
            }}>
            <InfiniteLoader />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default MyEvents;
