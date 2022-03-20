import React from 'react';
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native';

import styles from './styles';

const MessageInput = ({onPress, onTextChange, value}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => null} style={styles.imageLeft}>
        <Image source={require('../../assets/Camera.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null} style={styles.imageLeft}>
        <Image source={require('../../assets/Gallery.png')} />
      </TouchableOpacity>
      <TextInput
        onChangeText={onTextChange}
        placeholder="Enter message"
        value={value}
        style={styles.textInput}
      />
      {value && value !== '' && value.trim() !== '' ? (
        <TouchableOpacity style={{paddingLeft: 9}} onPress={onPress}>
          <Image source={require('../../assets/SendMessage.png')} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default MessageInput;
