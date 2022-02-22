import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {MessageInput} from '@components';

import styles from './styles';

const data = [
  {
    id: 1,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis. ',
    user: 1,
  },
  {
    id: 2,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    user: 1,
  },
  {
    id: 3,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    user: 2,
  },
  {
    id: 4,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla quam eu faci lisis mollis. ',
    user: 1,
  },
  {
    id: 5,
    message: 'Poruka 5 ',
    user: 2,
  },
];

const ChatMessages = () => {
  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={[
            styles.messageContainer,
            item.user === 1
              ? styles.userMessageContainer
              : styles.friendMessageContainer,
          ]}>
          <Text
            style={
              item.user === 1
                ? styles.userMessageContainerText
                : styles.friendMessageContainerText
            }>
            {item.message}
          </Text>
        </View>
        <View
          style={[
            styles.triangle,
            item.user === 1 ? styles.triangleRight : styles.triangleLeft,
          ]}
        />
      </View>
    );
  };

  const renderMesagesList = () => {
    return (
      <FlatList
        contentContainerStyle={{alignItems: 'stretch'}}
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        inverted
      />
    );
  };

  const renderMessageInput = () => {
    return <MessageInput />;
  };

  return (
    <View style={styles.container}>
      {renderMesagesList()}
      {renderMessageInput()}
    </View>
  );
};

export default ChatMessages;
