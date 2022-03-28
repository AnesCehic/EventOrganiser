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

import {LoadingIndicator, BottomSheetModal} from '@components';
import {toast} from '@utils';

import EventsCalendar from './EventsCalendar';

import {EventService} from '@services/apiClient';
import styles from './styles';

const EventsList = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsFromToday, setEventsFromToday] = useState([]);
  const [myEventsCount, setMyEventsCount] = useState(0);
  const [showAgenda, setShowAgenda] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setIsLoading(true);
      const allEvents = await EventService.find();
      const eventsToShow = await EventService.find({
        query: {
          start: {
            $gte: new Date(),
          },
        },
      });

      // ownerId: "620471fee097e159cbccec8a"

      // const myEventsRes = await EventService.find({
      //   query: {
      //     ownerId: userData._id,
      //   },
      // });

      // const showMyEvents = eventsToShow.data.filter(
      //   ev => ev.ownerId === userData._id,
      // ).length;

      // setMyEventsCount(showMyEvents);
      setEvents(allEvents.data);
      setEventsFromToday(eventsToShow.data);
      // setMyEvents(myEventsRes.data);
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
        data={eventsFromToday}
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

  const renderMyEventsButton = () => {
    return (
      <TouchableOpacity
        style={styles.myEventsButtonContainer}
        onPress={() => {
          navigation.navigate('MyEventsScreen');
        }}>
        <Text>My Events</Text>
        <View style={styles.myEventsButtonCount}>
          <Text style={styles.myEventsButtonText}>
            {/* {myEventsCount} */}1
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRefresh = () => {
    getEvents();
  };

  const navigateToEvent = id => {
    setShowAgenda(false);
    navigation.navigate('FeedDetails', {
      id: id,
    });
  };

  const navigateToMonth = date => {
    setShowAgenda(false);
    setTimeout(() => {
      navigation.navigate('EventsOnMonthScreen', {
        date: date,
      });
    }, 300);
  };

  const navigateToDay = day => {
    setShowAgenda(false);
    setTimeout(() => {
      navigation.navigate('EventsOnDayScreen', {
        day: day,
      });
    }, 300);
  };

  const renderAgenda = () => {
    return (
      <BottomSheetModal
        contentContainerStyle={{flex: 1, marginTop: 50, padding: 125}}
        isVisible={showAgenda}
        closeModal={() => setShowAgenda(false)}>
        <TouchableOpacity
          style={styles.showAgendaBtn}
          onPress={() => setShowAgenda(false)}>
          <Icon name="ri-close-line" />
        </TouchableOpacity>
        <EventsCalendar
          // events={events}
          navigateToEvent={navigateToEvent}
          navigateToMonth={navigateToMonth}
          navigateToDay={navigateToDay}
        />
      </BottomSheetModal>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.topImage}
        source={require('../../assets/headerBackground.png')}
        resizeMode="cover">
        <View style={styles.topImageContent}>
          <Text style={styles.headerText}>Events</Text>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              backgroundColor: 'white',
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setShowAgenda(true)}>
            <Icon name="ri-calendar-todo-fill" size={18} />
            <Text
              style={{
                marginLeft: 5,
                fontWeight: '600',
                // color: 'white',
              }}>
              {dayjs().format('MMMM')}
            </Text>
          </TouchableOpacity>
        </View>
        {/* {renderMyEventsButton()} */}
      </ImageBackground>
      <View style={[styles.eventsListContainer, {marginTop: -60}]}>
        {renderEventsList()}
      </View>

      {renderAgenda()}
    </View>
  );
};

export default EventsList;
