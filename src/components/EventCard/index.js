import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';

const EventCard = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.eventCardContainer}
      onPress={() => navigation.navigate('FeedDetails')}>
      <View style={styles.dateTime}>
        <View style={styles.dateContainer}>
          <Text>22</Text>
          <Text>OCT</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>07:30 PM</Text>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Annual fundraiser 2020</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
