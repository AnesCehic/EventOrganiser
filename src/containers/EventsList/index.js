import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {EventItem, LoadingIndicator} from '@components';
import {Constants} from '@common';
import {useEvents} from '../../hooks';

import {EventService} from '@services/apiClient';

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
    // navigation.navigate('FeedDetailsScreen', {id: id});
  };

  const renderItem = item => {
    console.log('item 123', item.id);
    return (
      <TouchableOpacity
        onPress={() => navigateToEvent(item.id)}
        style={{
          backgroundColor: 'white',
          margin: 5,
          borderRadius: 15,
          justifyContent: 'center',
          // alignItems: 'center',
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 30,
        }}>
        <Text style={{fontSize: 18}}>{item.title}</Text>
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
    console.log('eventDates', eventDates);
    return (
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={eventDates}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          // console.log('trigger items loading', month);
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          // console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          // console.log('day pressed');
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {
          // console.log('day changed');
        }}
        // Initially selected day
        selected={today}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={today}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2032-05-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={renderItem}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        // renderDay={(day, item) => {
        //   return (
        //     <View
        //       style={{
        //         justifyContent: 'center',
        //         paddingVertical: 10,
        //         paddingHorizontal: 20,
        //         marginVertical: 5,
        //         backgroundColor: 'white',
        //         marginHorizontal: 5,
        //       }}>
        //       <Text style={{fontSize: 24}}>{dayjs(day).format('DD dd')}</Text>
        //     </View>
        //   );
        // }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify how agenda knob should look like
        // renderKnob={}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        hideKnob={false}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={markedDates}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={false}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          // ...calendarTheme,
          // agendaDayTextColor: 'yellow',
          // agendaDayNumColor: 'green',
          // agendaTodayColor: 'red',
          agendaKnobColor: '#e1e1e1',
        }}
        // Agenda container style
        style={{}}
      />
    );
    // return (
    //   <Agenda
    //     // The list of items that have to be displayed in agenda. If you want to render item as empty date
    //     // the value of date key has to be an empty array []. If there exists no value for date key it is
    //     // considered that the date in question is not yet loaded

    //     items={{
    //       '2022-03-06': [{name: 'item 1 - any js object'}],
    //       '2022-03-07': [{name: 'item 2 - any js object'}],
    //     }}
    //     // items={eventDates}
    //     // Callback that gets called when items for a certain month should be loaded (month became visible)
    //     loadItemsForMonth={month => {
    //       console.log('trigger items loading');
    //     }}
    //     // Callback that fires when the calendar is opened or closed
    //     onCalendarToggled={calendarOpened => {
    //       console.log(calendarOpened);
    //     }}
    //     // Callback that gets called on day press
    //     onDayPress={day => {
    //       console.log('day pressed');
    //     }}
    //     // Callback that gets called when day changes while scrolling agenda list
    //     onDayChange={day => {
    //       console.log('day changed');
    //     }}
    //     // Initially selected day
    //     selected={'2022-03-06'}
    //     // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    //     minDate={today}
    //     // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    //     maxDate={'2022-03-08'}
    //     // Max amount of months allowed to scroll to the past. Default = 50
    //     pastScrollRange={50}
    //     // Max amount of months allowed to scroll to the future. Default = 50
    //     futureScrollRange={50}
    //     // Specify how each item should be rendered in agenda
    //     // renderItem={(item, firstItemInDay) => {
    //     //   return <View />;
    //     // }}
    //     renderItem={renderItem}
    //     // Specify how each date should be rendered. day can be undefined if the item is not first in that day
    //     renderDay={(day, item) => {
    //       return (
    //         <View style={{width: 20, height: 20, backgroundColor: 'red'}} />
    //       );
    //     }}
    //     // Specify how empty date content with no items should be rendered
    //     renderEmptyDate={() => {
    //       return <View />;
    //     }}
    //     // Specify how agenda knob should look like
    //     renderKnob={() => {
    //       return (
    //         <View
    //           style={{
    //             marginTop: 5,
    //             width: 30,
    //             height: 3,
    //             borderRadius: 5,
    //             backgroundColor: '#f1f1f1',
    //           }}
    //         />
    //       );
    //     }}
    //     // Specify what should be rendered instead of ActivityIndicator
    //     renderEmptyData={() => {
    //       return <View />;
    //     }}
    //     // Specify your item comparison function for increased performance
    //     rowHasChanged={(r1, r2) => {
    //       return r1.text !== r2.text;
    //     }}
    //     // Hide knob button. Default = false
    //     hideKnob={false}
    //     // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
    //     showClosingKnob={true}
    //     // By default, agenda dates are marked if they have at least one item, but you can override this if needed
    //     // markedDates={{
    //     //   '2012-05-16': {selected: true, marked: true},
    //     //   '2012-05-17': {marked: true},
    //     //   '2012-05-18': {disabled: true},
    //     // }}
    //     // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
    //     disabledByDefault={true}
    //     // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
    //     onRefresh={() => console.log('refreshing...')}
    //     // Set this true while waiting for new data from a refresh
    //     refreshing={false}
    //     // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
    //     refreshControl={null}
    //     // Agenda theme
    //     theme={
    //       {
    //         // ...calendarTheme,
    //         // agendaDayTextColor: 'yellow',
    //         // agendaDayNumColor: 'green',
    //         // agendaTodayColor: 'red',
    //         // agendaKnobColor: 'blue',
    //       }
    //     }
    //     // Agenda container style
    //     style={{flex: 1}}
    //   />
    // );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 15}}>
      <Text>123</Text>
      {renderAgenda()}
      {/* <View
        style={{width: 400, height: 800, backgroundColor: 'red', top: 300}}
      /> */}
    </View>
  );
};

export default EventsList;

// import React, {useEffect} from 'react';
// import {View, Text, FlatList, RefreshControl} from 'react-native';
// import dayjs from 'dayjs';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

// import {EventItem, LoadingIndicator} from '@components';
// import {Constants} from '@common';
// import {useEvents} from '../../hooks';

// import styles from './styles';

// const EventsList = ({navigation}) => {
//   const {events, eventsError, eventsLoading, refetch} = useEvents();

//   useEffect(() => {
//     if (eventsError) {
//       //toast here
//     }
//   }, [eventsError]);

//   const renderCalendar = () => {
//     const today = dayjs().format();
//     // const maxDate = dayjs().add(20, 'day').format(); // testing max date

//     const eventDates = events.reduce((acc, value) => {
//       const key = dayjs(value.start).format('YYYY-MM-DD');
//       acc[key] = {
//         marked: true,
//         dotColor: value.start < today ? '#007FFF' : '#12D125',
//       };
//       return acc;
//     }, {});

//     return (
//       <Calendar
//         current={today}
//         minDate={today}
//         // maxDate={maxDate}
//         onDayPress={day => {
//           navigation.navigate(Constants.NavigationScreens.ContentScreen, {
//             date: day.dateString,
//           });
//         }}
//         onDayLongPress={day => {
//           console.log('long selected day', day);
//         }}
//         // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
//         monthFormat={'yyyy MM'}
//         // Handler which gets executed when visible month changes in calendar. Default = undefined
//         onMonthChange={month => {
//           console.log('month changed', month);
//         }}
//         hideArrows={false}
//         // Replace default arrows with custom ones (direction can be 'left' or 'right')
//         // renderArrow={direction => <Arrow />}
//         hideExtraDays={false}
//         disableMonthChange={true}
//         firstDay={1}
//         hideDayNames={false}
//         showWeekNumbers={false}
//         // Handler which gets executed when press arrow icon left. It receive a callback can go back month
//         onPressArrowLeft={subtractMonth => subtractMonth()}
//         // Handler which gets executed when press arrow icon right. It receive a callback can go next month
//         onPressArrowRight={addMonth => addMonth()}
//         disableArrowLeft={false}
//         disableArrowRight={false}
//         disableAllTouchEventsForDisabledDays={true}
//         renderHeader={date => {
//           const month = dayjs(date).format('MMMM YYYY');
//           return <Text>{month}</Text>;
//         }}
//         // Enable the option to swipe between months. Default = false
//         enableSwipeMonths={false}
//         markedDates={eventDates}
//         theme={{
//           arrowColor: '#000',
//           todayTextColor: '#2d4150',
//         }}
//       />
//     );
//   };

//   const renderItem = ({item: event}) => {
//     const date = dayjs(event.start).format('ddd, MMM D, YYYY h:mm A');
//     return (
//       <EventItem
//         date={date}
//         img={event.img}
//         name={event.title}
//         location={event.location}
//       />
//     );
//   };

//   const renderSeparator = () => {
//     return <View style={styles.separator} />;
//   };

//   const renderEventsList = () => {
//     return (
//       <FlatList
//         style={styles.eventList}
//         data={events}
//         renderItem={renderItem}
//         ItemSeparatorComponent={renderSeparator}
//         keyExtractor={item => item._id}
//         refreshControl={
//           <RefreshControl
//             refreshing={eventsLoading}
//             onRefresh={handleRefresh}
//           />
//         }
//       />
//     );
//   };

//   const handleRefresh = () => {
//     refetch({}); // trigger refetch from hook
//   };

//   if (eventsLoading) {
//     return <LoadingIndicator />;
//   }

//   return (
//     <View style={styles.container}>
//       {renderCalendar()}
//       {renderEventsList()}
//     </View>
//   );
// };

// export default EventsList;
