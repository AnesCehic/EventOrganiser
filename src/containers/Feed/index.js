import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Search from '@components/SearchInput';
import EventCard from '@components/EventCard';

import styles from './styles';

const Feed = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <EventCard navigation={navigation} />
        <EventCard />
        <EventCard />
      </View>

      <Search />
    </View>
  );
};

export default Feed;
