import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';

import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/EvilIcons';

import {MenuItem, SubmitButton, LoadingIndicator} from '@components';
import {UserContext} from '@contexts';
import {MessageGroupsService} from '@services/apiClient';
import {Styles} from '@common';

import data from './data';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {Avatar, SearchBar} from 'react-native-elements';

const Chat = ({navigation}) => {
  const {chatForbiden} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messageGroups, setMessageGroups] = useState([]);
  const [search, setSearch] = useState('');

  const navigateToMessages = (groupId, label) => {
    navigation.navigate('Message', {
      groupId,
      label,
    });
  };

  const renderChatHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <View>
            <Text style={styles.title}>Chat</Text>
          </View>
          <View style={styles.createMessageIcon}>
            <Image source={require('../../assets/CreateMessage.png')} />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 32,
            backgroundColor: Styles.Colors.white,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderRadius: 6,
          }}>
          {/* <Icon name="search" size={30} style={{padding: 5}} /> */}
          <TextInput
            value={search}
            style={{paddingLeft: 10, paddingRight: 10}}
            onChangeText={text => setSearch(text)}
            placeholder="Search conversations or people"
          />
        </View>
      </View>
    );
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
      <TouchableOpacity
        onPress={() => navigateToMessages(item._id, item.label)}
        style={styles.messageContainer}>
        <Avatar
          size={Styles.Sizes.avatarMedium}
          rounded
          source={{
            uri: 'file:///data/user/0/com.lincolnapp.debug/cache/rn_image_picker_lib_temp_1c88e986-71f2-4539-bb8a-d55863efc05c.jpg',
          }}
        />
        <View style={styles.infoContainer}>
          <View style={styles.nameAndTime}>
            <Text style={styles.label}>{item.label}</Text>
          </View>
          <View>
            <Text>Should we grab some food</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMessageGroups = () => {
    return (
      <FlatList
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
      {renderChatHeader()}
      <View>{renderMessageGroups()}</View>
    </View>
  );
};

export default Chat;
