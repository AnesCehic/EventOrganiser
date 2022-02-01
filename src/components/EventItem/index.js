import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';

import styles from './styles';

const EventItem = ({name, img, date, location, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          style={styles.img}
          source={{
            uri: img,
          }}
        />
      </View>
      <View style={styles.rightContent}>
        <Text h5 style={styles.date}>
          {date}
        </Text>
        <Text h4 style={styles.name}>
          {name}
        </Text>
        <Text h5 style={styles.location}>
          {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;
