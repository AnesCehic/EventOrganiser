import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import DateAndPlace from './DateAndPlace';

import styles from './styles';

const FeedDetails = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./image.png')} />

      <View style={styles.dateAndLocationWithInfo}>
        <DateAndPlace icon="calendar-today" text="January, 28th 2022" />
        <DateAndPlace icon="location-pin" text="Test" />
      </View>

      <View style={styles.rsvpContainer}>
        <TouchableOpacity style={styles.rsvpButton}>
          <Text style={styles.rsvpText}>RSVP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateAndLocationWithInfo}>
        <Text style={styles.header}>Description</Text>
      </View>
    </View>
  );
};

export default FeedDetails;
