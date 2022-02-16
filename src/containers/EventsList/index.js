import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {EventItem} from '@components';
import {Constants} from '@common';
import {EventService} from '@services/apiClient';

import styles from './styles';

const EventsList = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setIsLoading(true);

      const {data} = await EventService.find();

      setEvents(data || []);
      setIsLoading(false);
    } catch (e) {
      console.log('[Error fetch Events]', e);
    }
  };

  const renderCalendar = () => {
    const today = dayjs().format();
    // const maxDate = dayjs().add(20, 'day').format(); // testing max date

    const eventDates = events.reduce((acc, value) => {
      const key = dayjs(value.start).format('YYYY-MM-DD');
      acc[key] = {
        marked: true,
        dotColor: value.start < today ? '#007FFF' : '#12D125',
      };
      return acc;
    }, {});

    return (
      <Calendar
        current={today}
        minDate={today}
        // maxDate={maxDate}
        onDayPress={day => {
          console.log('selected day', day);
          navigation.navigate(Constants.NavigationScreens.ContentScreen, {
            testParam: 'test param',
          });
        }}
        onDayLongPress={day => {
          console.log('long selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={direction => <Arrow />}
        hideExtraDays={false}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={true}
        renderHeader={date => {
          const month = dayjs(date).format('MMMM YYYY');
          return <Text>{month}</Text>;
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={false}
        markedDates={eventDates}
        theme={{
          arrowColor: 'black',
          todayTextColor: '#2d4150',
        }}
      />
    );
  };

  const renderItem = ({item: event}) => {
    const date = dayjs(event.start).format('ddd, MMM D, YYYY h:mm A');
    return (
      <EventItem
        date={date}
        img={event.img}
        name={event.title}
        location={event.location}
      />
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderEventsList = () => {
    return (
      <FlatList
        style={styles.eventList}
        data={events}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={item => item.name}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      />
    );
  };

  const handleRefresh = () => {
    getEvents();
  };

  if (isLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderCalendar()}
      {renderEventsList()}
    </View>
  );
};

export default EventsList;
