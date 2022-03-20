import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import {Agenda} from 'react-native-calendars';

import {LoadingIndicator} from '@components';
import {Constants} from '@common';

import {EventService} from '@services/apiClient';
import styles from './styles';

const EventsList = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  // const {events, eventsError, eventsLoading, refetch} = useEvents();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setIsLoading(true);
      const res = await EventService.find();
      setEvents(res.data);
    } catch (error) {
      console.log('[Error get events]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToEvent = id => {
    navigation.navigate('FeedDetails', {
      id: id,
    });
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => navigateToEvent(item.id)}
        style={styles.eventItem}>
        <Text style={styles.eventItemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderAgenda = () => {
    const today = dayjs().format('YYYY-MM-DD');
    const markedDates = {};
    const eventDates = events.reduce((acc, value) => {
      const key = dayjs(value.start).format('YYYY-MM-DD');
      acc[key] = [
        {
          id: value._id,
          title: value.title,
        },
      ];
      markedDates[key] = {
        marked: true,
      };
      return acc;
    }, {});

    return (
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={eventDates}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {}}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {}}
        // Callback that gets called on day press
        onDayPress={day => {}}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {}}
        // Initially selected day
        selected={today}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={today}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2032-05-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={6}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}
        // Specify how each item should be rendered in agenda
        renderItem={renderItem}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        // renderDay={(day, item) => {}}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify how agenda knob should look like
        // renderKnob={}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return (
            <View style={styles.calendarEmptyData}>
              <Text style={styles.calendarEmptyDataText}>
                No events on selected date
              </Text>
            </View>
          );
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button.
        hideKnob={false}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar.
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={markedDates}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled.
        disabledByDefault={false}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={null}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        refreshControl={null}
        // Agenda theme
        theme={{
          agendaKnobColor: '#e1e1e1',
        }}
        // Agenda container style
        style={{}}
        renderHeader={(date, i) => {
          return (
            <View style={styles.header}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                {`${dayjs(date['0']).format('MMMM')}, ${dayjs(date['0']).format(
                  'YYYY',
                )}`}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F5F6F7',
                  padding: 11,
                  borderRadius: 50,
                }}
                onPress={() => {
                  navigation.navigate('EventsOnMonthScreen', {
                    date: dayjs(date['0']).format(),
                  });
                }}>
                <Text style={styles.headerText}>Show entire month</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <View style={styles.container}>{renderAgenda()}</View>;
};

export default EventsList;
