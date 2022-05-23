import React from 'react';
import {Text, View} from 'react-native';

import {Time, Place} from '@assets/SvgIcons';
import {Styles} from '@common';
import styles from './styles';

const Date = ({icon, text1, text2, bold, isDarkMode}) => {
  let renderIcon;
  if (icon === 'time') {
    renderIcon = <Time />;
  }
  if (icon === 'place') {
    renderIcon = <Place />;
  }
  return (
    <View
      style={[
        styles.dateContainer,
        isDarkMode && {backgroundColor: '#273038', borderWidth: 0},
      ]}>
      <View style={styles.centeredIconVertically}>
        <View style={styles.datePlaceIcon}>{renderIcon}</View>
      </View>
      <View style={styles.dateTextContainer}>
        <Text
          style={[
            styles.dateText,
            bold ? styles.dateTextBigger : {},
            isDarkMode && {color: Styles.Colors.white},
          ]}>
          {text1}
        </Text>
        <Text
          style={[
            styles.dateText,
            styles.dateText2,
            isDarkMode && {color: Styles.Colors.white},
          ]}>
          {text2}
        </Text>
      </View>
    </View>
  );
};

export default Date;
