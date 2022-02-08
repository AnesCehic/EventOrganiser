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
        <View style={styles.rightContentTop}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text h5 style={styles.location}>
          {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;
