import React, {useState, useEffect, useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import dayjs from 'dayjs';

import {MenuItem, SubmitButton, LoadingIndicator} from '@components';
import {UserContext} from '@contexts';
import {MessageGroupsService} from '@services/apiClient';

import data from './data';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Chat = ({navigation}) => {
  const {chatForbiden} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messageGroups, setMessageGroups] = useState([]);

  const navigateToMessages = groupId => {
    navigation.navigate('Messages', {
      groupId,
    });
  };

  const getAllMessages = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorageLib.getItem('@userId');
      const {data} = await MessageGroupsService.find({
        query: {
          participants: userId,
        },
      });
      setMessageGroups(data);
    } catch (error) {
      console.log('[Error get message groups]', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const renderGroup = ({item}) => {
    return (
      <MenuItem
        key={item._id}
        onPress={() => {
          navigateToMessages(item._id);
        }}
        menuText={item._id}
      />
    );
  };

  const renderMessageGroups = () => {
    console.log(messageGroups);
    return (
      <FlatList
        style={{
          padding: 20,
        }}
        data={messageGroups}
        keyExtractor={item => item._id}
        renderItem={renderGroup}
      />
    );
  };

  if (chatForbiden) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 26}}>Forbiden!</Text>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 70}}>{renderMessageGroups()}</View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
          height: 50,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <SubmitButton
          style={{marginTop: 0, width: '60%'}}
          title="Send message"
          onPress={() => null}
        />
      </View>
    </View>
  );
};

export default Chat;
