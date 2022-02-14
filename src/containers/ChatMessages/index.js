import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {MessageInput} from '@components';

import styles from './styles';

const data = [
  {
    id: 1,
    message: 'Poruka 1',
    user: 1,
  },
  {
    id: 2,
    message: 'Poruka 2',
    user: 1,
  },
  {
    id: 3,
    message: 'Poruka 3',
    user: 2,
  },
  {
    id: 4,
    message: 'Poruka 4',
    user: 1,
  },
  {
    id: 5,
    message: 'Poruka 5',
    user: 2,
  },
];

const ChatMessages = () => {
  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.message}</Text>
      </View>
    );
  };

  const renderMesagesList = () => {
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
