import React, {memo} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-elements';
import RenderHTML from 'react-native-render-html';

import styles from './styles';

const PostItem = ({onPress, img, time, headline, content}) => {
  const source = {
    html: `<section>${content}</section>`,
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: img[0].signedURL}}
          width={100}
          height={100}
          resizeMode="cover"
        />
      </View>
      <View style={styles.ownerAndTimeInfo}>
        <View style={styles.ownerData}>
          <Image source={require('../../assets/data.png')} />
          <Text style={styles.ownerName}>Adam Braley</Text>
        </View>
        <Text>5d ago</Text>
      </View>
      <Text style={styles.headline}>{headline}</Text>
      <RenderHTML contentWidth={10} source={source} />
    </TouchableOpacity>
  );
};

export default memo(PostItem);
