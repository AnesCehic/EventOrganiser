import React, {useState, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {MessageInput} from '@components';

import {MessagesService} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const ChatMessages = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [textMessage, setTextMessage] = useState('');

  MessagesService.on('created', message => {
    if (message.groupId === route.params.groupId) {
      setMessages([message, ...messages]);
      setTextMessage('');
    }
  });

  const getMessages = async () => {
    try {
      const userId = await AsyncStorageLib.getItem('@userId');
      setUserId(userId);
      const {data} = await MessagesService.find({
        query: {
          groupId: route.params.groupId,
          $sort: {
            createdAt: -1,
          },
        },
      });
      setMessages(data);
    } catch (error) {
      console.log('[Error get messages]', error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={[
            styles.messageContainer,
            item.ownerId === userId
              ? styles.userMessageContainer
              : styles.friendMessageContainer,
          ]}>
          <Text
            style={
              item.ownerId === userId
                ? styles.userMessageContainerText
                : styles.friendMessageContainerText
            }>
            {item.text}
          </Text>
        </View>
        <View
          style={[
            styles.triangle,
            item.ownerId === userId
              ? styles.triangleRight
              : styles.triangleLeft,
          ]}
        />
      </View>
    );
  };

  const renderMesagesList = () => {
    return (
      <FlatList
        contentContainerStyle={{alignItems: 'stretch'}}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        inverted
        onEndReached={() => console.log('reached')}
      />
    );
  };

  const textChange = text => {
    setTextMessage(text);
  };

  const sendMessage = async () => {
    try {
      const res = await MessagesService.create({
        groupId: route.params.groupId,
        text: textMessage,
      });
      setTextMessage('');
    } catch (error) {
      console.log('[Error sending a message]', error);
    }
  };

  const renderMessageInput = () => {
    return (
      <MessageInput
        value={textMessage}
        onTextChange={textChange}
        onPress={sendMessage}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderMesagesList()}
      {renderMessageInput()}
    </View>
  );
};

export default ChatMessages;
