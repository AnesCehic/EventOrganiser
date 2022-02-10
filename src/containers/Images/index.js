import React from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';

import styles from './styles';

import data from './data';

const Images = ({}) => {
  const renderImages = () => {
    return data.map((image, index) => {
      const nthChild = index + 1;
      let width;
      let height = 128;
      if (nthChild % 1 === 0) {
        width = '33%';
      }
      if (nthChild % 2 === 0) {
        width = '66%';
      }
      if (nthChild % 3 === 0) {
        width = '100%';
        height = 198;
      }
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={image.id}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{padding: 5, width, height}}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{uri: image.url}}
          />
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {renderImages()}
    </ScrollView>
  );
};

export default Images;
