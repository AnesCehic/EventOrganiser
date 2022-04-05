import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Appearance} from 'react-native';
import dayjs from 'dayjs';
import {CalendarList} from 'react-native-calendars';
import Icon from 'react-native-remix-icon';

import {Styles} from '@common';

import {EventService} from '@services/apiClient';

import styles from './styles';

const EventsCalendar = ({navigateToEvent, navigateToMonth, navigateToDay}) => {
  const colorScheme = Appearance.getColorScheme();
  const today = dayjs().format('YYYY-MM-DD');

  const [events, setEvents] = useState([]);
  const [eventsMonths, setEventsMonths] = useState([]);

  const eventDates = events.reduce(
    (acc, value) => {
      const key = dayjs(value.start).format('YYYY-MM-DD');
      acc[key] = {
        id: value._id,
        title: value.title,
        marked: true,
        dotColor: Styles.Colors.gold,
      };
      return acc;
    },
    {[today]: {selected: true, selectedColor: Styles.Colors.gold}},
  );

  useEffect(() => {
    getEvents(eventsMonths);
  }, [eventsMonths]);

  // add error handling
  const getEvents = async months => {
    try {
      const mDataGTE = months.map(m => {
        return dayjs(m.dateString).startOf('month').format();
      });
      const mDataLTE = months.map(m => {
        return dayjs(m.dateString).endOf('month').format();
      });

      const eventsToShow = await EventService.find({
        query: {
          start: {
            $gte: mDataGTE[0],
            $lte: mDataLTE[mDataLTE.length - 1],
          },
        },
      });
      setEvents(eventsToShow.data);
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <CalendarList
      // current={today}
      // selected={today}
      onDayPress={day => {
        const selectedDay = Object.keys(eventDates).find(key => {
          if (eventDates[key].marked) {
            return key === day.dateString;
          }
        });
        if (selectedDay) {
          navigateToDay(selectedDay);
        }
      }}
      onVisibleMonthsChange={months => {
        setEventsMonths(months);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy MM'}
      hideArrows={true}
      hideExtraDays={true}
      disableMonthChange={true}
      firstDay={1}
      hideDayNames={false}
      showWeekNumbers={false}
      disableAllTouchEventsForDisabledDays={true}
      renderHeader={date => {
        const month = dayjs(date).format('MMMM YYYY');
        // console.log('DATE FINAL', date);
        // console.log('MONTH FINAL', month);
        // console.log('YYEYYEYEYEYE', dayjs(date['0']).format());
        return (
          <View style={styles.header}>
            <Text style={styles.calendarHeaderText}>{month}</Text>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => {
                navigateToMonth(date);
              }}>
              <Icon
                name="ri-calendar-todo-fill"
                size={18}
                color={colorScheme === 'light' ? '#000' : Styles.Colors.gold}
              />
              <Text
                style={[
                  styles.calendarHeaderText,
                  styles.calendarHeaderTextMonth,
                ]}>
                Show entire month
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      enableSwipeMonths={false}
      markedDates={eventDates}
    />
  );
};

export default EventsCalendar;
