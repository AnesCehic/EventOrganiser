import React, {memo} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-elements';
import dayjs from 'dayjs';

import styles from './styles';

const PostItem = ({
  onPress,
  img,
  time,
  headline,
  content,
  owner,
  createdAt,
}) => {
  const timeFromNow = dayjs(createdAt).fromNow();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {img && img[0]?.signedURL ? (
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: img[0].signedURL,
            }}
            style={styles.image}
          />
        </View>
      ) : null}
      <View style={styles.ownerAndTimeInfo}>
        <View style={styles.ownerData}>
          <Image source={require('../../assets/data.png')} />
          <Text
            style={
              styles.ownerName
            }>{`${owner.firstName} ${owner.lastName}`}</Text>
        </View>
        <Text>{timeFromNow}</Text>
      </View>
      {content ? (
        <Text style={styles.content} numberOfLines={2}>
          {content}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(PostItem);
