import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-remix-icon';

import styles from './styles';

const EventItem = ({
  onPress,
  startDate,
  endDate,
  startTime,
  source,
  location,
  imageUrl,
  title,
}) => {
  return (
    <TouchableOpacity style={styles.eventsListItemContainer} onPress={onPress}>
      <View style={styles.eventsListItemImageWrapper}>
        <Image
          source={{uri: imageUrl}}
          style={styles.eventsListItemImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.eventsListItemTopWrapper}>
        <Text style={styles.eventListItemTitle}>{title}</Text>
        {/* <RenderHTML contentWidth={10} source={source} /> */}
        {source}
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
