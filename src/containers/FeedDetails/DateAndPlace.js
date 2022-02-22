import React from 'react';
import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const Date = ({icon, text}) => {
  return (
    <View style={styles.dateContainer}>
      <Icon name={icon} size={40} />
      <Text style={styles.dateText}>{text}</Text>
    </View>
  );
};

export default Date;
