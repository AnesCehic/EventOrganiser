import React, {memo} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-elements';
import RenderHTML from 'react-native-render-html';

import styles from './styles';

const PostItem = ({onPress, img, time, headline, content, owner}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {img && img[0]?.signedURL ? (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: img[0].signedURL}}
            width={100}
            height={100}
            resizeMode="cover"
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
        <Text>5d ago</Text>
      </View>
      <Text style={{paddingTop: 16, paddingBottom: 6}} numberOfLines={2}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(PostItem);
