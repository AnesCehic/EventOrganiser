import React from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import dayjs from 'dayjs';

import {EventItem} from '@components';

import styles from './styles';

import data from './data';

const EventsList = ({}) => {
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
  return <View style={styles.container}>{renderEventsList()}</View>;
};

export default EventsList;
