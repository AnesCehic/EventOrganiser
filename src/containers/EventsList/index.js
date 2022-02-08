import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {EventItem} from '@components';

import styles from './styles';

import data from './data';

const EventsList = ({}) => {
  const renderCalendar = () => {
    const today = dayjs().format();
    const maxDate = dayjs().add(20, 'day').format(); // testing max date
    // test dots
    const markedDates = {
      [dayjs().format('YYYY-MM-DD')]: {selected: false},
      [dayjs().add(7, 'day').format('YYYY-MM-DD')]: {
        marked: true,
        dotColor: '#007FFF',
      },
      [dayjs().add(10, 'day').format('YYYY-MM-DD')]: {
        marked: true,
        dotColor: '#E7ECF3',
      },
      [dayjs().add(2, 'day').format('YYYY-MM-DD')]: {
        marked: true,
        dotColor: '#12D125',
      },
    };
    return (
      <Calendar
        current={today}
        minDate={today}
        maxDate={maxDate}
        onDayPress={day => {
          console.log('selected day', day);
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
        markedDates={markedDates}
        theme={{
          arrowColor: 'black',
          todayTextColor: '#2d4150',
        }}
      />
    );
  };

  const renderItem = ({item: event}) => {
    return (
      <EventItem
        date={dayjs().format('ddd, MMM D, YYYY h:mm A')}
        img={event.img}
        name={event.name}
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
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={item => item.name}
        onRefresh={handleRefresh}
        refreshing={false}
      />
    );
  };

  const handleRefresh = () => {};
  return (
    <View style={styles.container}>
      {renderCalendar()}
      {renderEventsList()}
    </View>
  );
};

export default EventsList;
