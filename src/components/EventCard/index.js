import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';

const EventCard = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.eventCardContainer}
      onPress={() => navigation.navigate('FeedDetails')}>
      <View style={styles.statusCirle} />

      <View style={styles.dateTime}>
        <Text style={styles.dateTimeText}>1/30</Text>
        <Text style={styles.dateTimeText}>20:30</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
