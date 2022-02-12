import React, {memo} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-elements';

import styles from './styles';

const PostItem = ({onPress, img, time, headline, content}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.img} />
      </View>
      <View style={styles.rightContent}>
        <View style={styles.topRightContent}>
          <Text style={styles.headline}>{headline}</Text>
          <Text h5 style={styles.time}>
            {time}
          </Text>
        </View>
        <Text numberOfLines={2} h5 style={styles.content}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PostItem);
