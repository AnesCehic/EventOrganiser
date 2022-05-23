import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-remix-icon';

import {Styles} from '@common';

import styles from './styles';

const EventItem = ({
  onPress,
  startDate,
  endDate,
  startTime,
  source,
  description,
  location,
  imageUrl,
  title,
  isDarkMode,
}) => {
  return (
    <TouchableOpacity
      style={[styles.eventsListItemContainer, isDarkMode && {borderWidth: 0}]}
      onPress={onPress}>
      <View style={styles.eventsListItemImageWrapper}>
        <Image
          source={{uri: imageUrl}}
          style={styles.eventsListItemImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.eventsListItemTopWrapper}>
        <Text
          style={[
            styles.eventListItemTitle,
            isDarkMode && {color: Styles.Colors.white},
          ]}>
          {title}
        </Text>
        {description}
      </View>
      <View style={styles.eventListItemDateAndTimeWrapper}>
        <View style={styles.eventListItemDateAndTime}>
          <Icon name="ri-time-line" color="#BFBB85" size={22} />
          <Text style={styles.eventListDateAndTimeText}>
            {startDate} - {endDate} • {startTime}
          </Text>
        </View>
        <View style={styles.eventListItemDateAndTime}>
          <Icon name="ri-map-pin-2-line" color="#BFBB85" size={22} />
          <Text style={styles.eventListDateAndTimeText}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// const EventItem = ({name, img, date, location, onPress}) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={styles.container}>
//       <View style={styles.leftContent}>
//         <Image
//           style={styles.img}
//           source={{
//             uri: img,
//           }}
//         />
//       </View>
//       <View style={styles.rightContent}>
//         <View style={styles.rightContentTop}>
//           <Text style={styles.date}>{date}</Text>
//           <Text style={styles.name}>{name}</Text>
//         </View>
//         <Text h5 style={styles.location}>
//           {location}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

export default EventItem;
