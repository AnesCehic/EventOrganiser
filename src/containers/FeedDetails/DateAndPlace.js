import React from 'react';
import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const Date = ({icon, text1, text2, bold}) => {
  return (
    <View style={styles.dateContainer}>
      <View style={{margin: 10}}>
        <Icon name={icon} size={40} />
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
