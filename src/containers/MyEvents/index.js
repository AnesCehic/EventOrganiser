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

import {LoadingIndicator} from '@components';
import {toast} from '@utils';

import {EventService} from '@services/apiClient';

import styles from './styles';

const MyEvents = ({navigation, route}) => {
  const myEventIds = route.params?.ids;

  const [isLoading, setIsLoading] = useState(false);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    getMyEvents();
  }, []);

  const getMyEvents = async () => {
    try {
      setIsLoading(true);
      const eventsToShow = await EventService.find({
        query: {
          start: {
            $gte: new Date(),
          },
          _id: {
            $in: myEventIds,
          },
        },
      });
      setMyEvents(eventsToShow.data);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error get events]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEventsList = () => {
    return (
      <FlatList
        data={myEvents}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={() => console.log('reached')}
      />
    );
  };

  const renderItem = ({item: event}) => {
    const startDate = dayjs(event.start).format('MMM DD');
    const endDate = dayjs(event.end).format('MMM DD');
    const startTime = dayjs(event.start).format('hh A');
    const location = event.location;
    const imageUrl = event?.upload?.files[0]?.signedURL;
    const source = {
      html: `<section>${event.description}</section>`,
    };
    return (
      <TouchableOpacity
        style={styles.eventsListItemContainer}
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
          <RenderHTML contentWidth={10} source={source} />
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
    getMyEvents();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.topImage}>
        <Text style={styles.headerText}>My events</Text>
      </ImageBackground>
      <View
        style={{
          padding: 10,
          marginTop: -60,
          flex: 1,
        }}>
        {renderEventsList()}
      </View>
    </View>
  );
};

export default MyEvents;
