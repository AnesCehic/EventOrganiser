import React from 'react';
import {View, TextInput} from 'react-native';

import styles from './styles';

const MessageInput = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter message" />
      <View style={styles.sendIcon}>

      </View>
    </View>
  );
};

export default MessageInput;
