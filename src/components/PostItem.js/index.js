import React, {memo} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-elements';
import dayjs from 'dayjs';

import UserIcon from '@assets/ImageComponents/UserIcon';

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
  const postAvatar = owner?.upload?.files[0]?.signedURL || 'default-uri';
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
          <View style={styles.ownerImageContainer}>
            {owner?.upload?.files[0]?.signedURL ? (
              <Image
                source={{
                  uri: postAvatar,
                }}
                style={styles.ownerImage}
              />
            ) : (
              <View style={{padding: 4}}>
                <UserIcon style={styles.ownerImage} />
              </View>
            )}
          </View>
          <Text
            style={
              styles.ownerName
            }>{`${owner.firstName} ${owner.lastName}`}</Text>
        </View>
        <View style={styles.timeFromNowContainer}>
          <Text style={styles.timeFromNow}>{timeFromNow}</Text>
        </View>
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
