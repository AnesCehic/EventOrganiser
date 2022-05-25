import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Appearance,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import dayjs from 'dayjs';

import {UserContext} from '@contexts';
import {LoadingIndicator, BottomSheetModal, InfiniteLoader} from '@components';
import {toast} from '@utils';
import {Styles} from '@common';
import {Calendar as CalendarIcon, Grid as GridIcon} from '@assets/SvgIcons';

import EventsCalendar from './EventsCalendar';

import {EventService, RSVPService} from '@services/apiClient';
import styles from './styles';

const EventsList = ({navigation, isDarkMode}) => {
  const colorScheme = Appearance.getColorScheme();
  const {userData} = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInfinite, setIsLoadingInfinite] = useState(false);
  const [eventsFromToday, setEventsFromToday] = useState([]);
  const [myEventsCount, setMyEventsCount] = useState(0);
  const [myEventsIds, setMyEventsIds] = useState([]);
  const [showAgenda, setShowAgenda] = useState(false);

  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    getNumberOfMyEvents();
  }, []);

  useEffect(() => {
    if (isLoading) {
      getEvents();
      getNumberOfMyEvents();
    }
  }, [isLoading]);

  const getNumberOfMyEvents = async () => {
    try {
      // find event ids that i attend from RSVP service
      const res = await RSVPService.find({
        query: {
          ownerId: userData._id,
        },
      });
      const ids = res?.data?.map(ev => {
        return ev.eventId;
      });
      // find count of event ids from event service
      const myEventIdsFromToday = await EventService.find({
        query: {
          start: {
            $gte: new Date(),
          },
          _id: {
            $in: ids,
          },
        },
      });

      setMyEventsIds(ids);
      setMyEventsCount(myEventIdsFromToday.total);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error get events]', error);
    }
  };

  const getEvents = async () => {
    try {
      // setIsLoading(true);
      if (total < limit) {
        return;
      }

      if (eventsFromToday.length >= total) {
        setIsLoadingInfinite(false);
        return;
      }

      const eventsToShow = await EventService.find({
        query: {
          start: {
            $gte: new Date(),
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

      setEventsFromToday([...eventsFromToday, ...eventsToShow.data]);

      setIsLoading(false);
      setIsLoadingInfinite(false);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error get events]', error);
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isLoadingInfinite) {
      loadMore();
    }
  }, [isLoadingInfinite]);

  const loadMore = () => {
    getEvents();
  };

  const renderEventsList = () => {
    return (
      <FlatList
        data={eventsFromToday}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        onEndReached={() => {
          setIsLoadingInfinite(true);
          loadMore();
        }}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        // }
        showsVerticalScrollIndicator={false}
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
          <Text
            style={[
              styles.eventListItemTitle,
              isDarkMode && {color: Styles.Colors.white},
            ]}>
            {event.title}
          </Text>
          <Text style={isDarkMode && {color: '#E6EBF0'}}>
            {source.text.substring(0, 85)}...
          </Text>
        </View>
        <View style={styles.eventListItemDateAndTimeWrapper}>
          <View style={styles.eventListItemDateAndTime}>
            <Icon name="ri-time-line" color="#BFBB85" size={22} />
            <Text
              style={[
                styles.eventListDateAndTimeText,
                isDarkMode && {color: '#E6EBF0'},
              ]}>
              {startDate} - {endDate} • {startTime}
            </Text>
          </View>
          <View style={styles.eventListItemDateAndTime}>
            <Icon name="ri-map-pin-2-line" color="#BFBB85" size={22} />
            <Text
              style={[
                styles.eventListDateAndTimeText,
                isDarkMode && {color: '#E6EBF0'},
              ]}>
              {location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMyEventsButton = () => {
    return myEventsCount > 0 ? (
      <TouchableOpacity
        style={styles.myEventsButtonContainer}
        onPress={() => {
          navigateToMyEvents();
        }}>
        <Text>My Events</Text>
        <View style={styles.myEventsButtonCount}>
          <Text style={styles.myEventsButtonText}>{myEventsCount}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  // eslint-disable-next-line no-unused-vars
  const handleRefresh = () => {
    setLimit(5);
    setSkip(0);
    setTotal(10);
    setEventsFromToday([]);
    setIsLoading(true);
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

  const navigateToMyEvents = () => {
    navigation.navigate('MyEventsScreen', {
      ids: myEventsIds,
    });
  };

  const renderAgenda = () => {
    return (
      <BottomSheetModal
        contentContainerStyle={[
          styles.sheetContainer,
          isDarkMode && {backgroundColor: '#0A121A'},
        ]}
        isVisible={showAgenda}
        closeModal={() => setShowAgenda(false)}>
        <TouchableOpacity
          style={[
            styles.showAgendaBtn,
            isDarkMode && {backgroundColor: '#0A121A'},
          ]}
          onPress={() => setShowAgenda(false)}>
          <Icon
            name="ri-close-line"
            color={colorScheme === 'light' ? '#000' : Styles.Colors.white}
          />
        </TouchableOpacity>
        <EventsCalendar
          navigateToEvent={navigateToEvent}
          navigateToMonth={navigateToMonth}
          navigateToDay={navigateToDay}
          isDarkMode={isDarkMode}
        />
      </BottomSheetModal>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={[styles.container, isDarkMode && {backgroundColor: '#0A121A'}]}>
      <View
        style={[
          styles.topImage,
          {
            backgroundColor:
              colorScheme !== 'dark'
                ? Styles.Colors.headerBackground
                : Styles.Colors.headerBackgroundDark,
          },
        ]}>
        <View style={styles.topImageContent}>
          <View style={styles.eventsHeaderContainer}>
            <Text
              style={[
                styles.headerText,
                isDarkMode && {color: Styles.Colors.white},
              ]}>
              <GridIcon color={colorScheme === 'dark' ? '#b5b5b5' : null} />
              <Text> </Text>
              Events
            </Text>
          </View>
          <TouchableOpacity
            style={styles.topMonthTouch}
            onPress={() => {
              setShowAgenda(true);
            }}>
            <CalendarIcon
              color={colorScheme === 'light' ? '#000' : Styles.Colors.gold}
            />
            <Text
              style={[
                styles.monthSelected,
                colorScheme === 'dark' && {
                  color: '#E6EBF0',
                },
              ]}>
              {dayjs().format('MMMM')}
            </Text>
          </TouchableOpacity>
        </View>
        {renderMyEventsButton()}
      </View>

      {eventsFromToday.length > 0 ? (
        <View
          style={[
            styles.eventsListContainer,
            {marginTop: myEventsCount > 0 ? -20 : -60, marginBottom: 16},
          ]}>
          {renderEventsList()}
        </View>
      ) : (
        <View>
          <Text style={isDarkMode && {color: Styles.Colors.white}}>
            No future events...
          </Text>
        </View>
      )}

      {isLoadingInfinite && eventsFromToday.length < total ? (
        <InfiniteLoader />
      ) : null}

      {renderAgenda()}
    </View>
  );
};

export default EventsList;
