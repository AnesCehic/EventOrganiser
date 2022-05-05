import React from 'react';
import {Text, View} from 'react-native';

import {Time, Place} from '@assets/SvgIcons';
import styles from './styles';

const Date = ({icon, text1, text2, bold}) => {
  let renderIcon;
  if (icon === 'time') {
    renderIcon = <Time />;
  }
  if (icon === 'place') {
    renderIcon = <Place />;
  }
  return (
    <View style={styles.dateContainer}>
      <View style={styles.centeredIconVertically}>
        <View style={styles.datePlaceIcon}>{renderIcon}</View>
      </View>
      <View style={styles.dateTextContainer}>
        <Text style={[styles.dateText, bold ? styles.dateTextBigger : {}]}>
          {text1}
        </Text>
        <Text style={[styles.dateText, styles.dateText2]}>{text2}</Text>
      </View>
    </View>
  );
};

export default Date;
