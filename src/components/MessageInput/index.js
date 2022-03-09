import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';

import styles from './styles';

const MessageInput = ({onPress, onTextChange, value}) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onTextChange}
        placeholder="Enter message"
      />
      <TouchableOpacity style={styles.sendIcon} onPress={onPress}>
        <Text>Send message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
