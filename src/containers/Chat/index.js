import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Animated,
} from 'react-native';

import {MenuItem, SubmitButton, LoadingIndicator} from '@components';
import {UserContext} from '@contexts';
import {MessageGroupsService} from '@services/apiClient';
import {Styles} from '@common';
import {
  Grid as GridIcon,
  NewMessage as NewMessageIcon,
  DeleteIconBig,
} from '@assets/SvgIcons';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {Avatar, SearchBar} from 'react-native-elements';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MainIcon from '../../components/ChatMessageIcon/MainIcon';

const Chat = ({navigation}) => {
  const {allowMessaging, userData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messageGroups, setMessageGroups] = useState([]);
  const [search, setSearch] = useState('');

  const navigateToMessages = (groupId, label, component) => {
    navigation.navigate('Message', {
      groupId,
      label,
      component,
    });
  };

  const renderChatHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.title}>
              <GridIcon />
              <Text> </Text>
              Chat
            </Text>
          </View>
          <TouchableOpacity
            style={styles.createMessageIcon}
            onPress={() => {
              navigation.navigate('CreateChat');
            }}>
            <View style={{color: Styles.Colors.white}}>
              <NewMessageIcon />
            </View>
          </TouchableOpacity>
        </View>
        {/* <View
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
            <Icon name="search" size={30} style={{padding: 5}} />
          <TextInput
            value={search}
            style={{paddingLeft: 10, paddingRight: 10}}
            onChangeText={text => setSearch(text)}
            placeholder="Search conversations or people"
          />
        </View> */}
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

  useEffect(() => {
    const refetchChatGroups = navigation.addListener('focus', () => {
      getAllMessages();
    });

    return refetchChatGroups;
  }, [navigation]);

  const deleteChat = async id => {
    try {
      const res = await MessageGroupsService.patch(id, {
        hide: true,
      });
      console.log(res);
      setMessageGroups(messageGroups.filter(item => item._id !== id));
    } catch (error) {
      console.log('[Error deleting group]', error);
    }
  };

  const renderRightActions = (progress, dragX, id) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[{backgroundColor: 'red'}, {transform: [{translateX: scale}]}]}>
        <TouchableOpacity
          onPress={() => deleteChat(id)}
          style={{
            flex: 1,
            width: 70,
            height: '100%',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <DeleteIconBig />
            <Text
              style={{
                color: 'white',
                marginTop: 3,
              }}>
              Delete
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderGroup = ({item}) => {
    const {component, componentHeader} = MainIcon(item, userData, navigation);

    return (
      <Swipeable
        friction={2}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item._id)
        }>
        <TouchableOpacity
          onPress={() =>
            navigateToMessages(
              item._id,
              item.label.length > 20
                ? `${item.label.slice(0, 20)}...`
                : item.label,
              componentHeader,
            )
          }
          style={styles.messageContainer}>
          {component}
          <View style={styles.infoContainer}>
            <View style={styles.nameAndTime}>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <View>
              <Text style={{fontSize: 14}}>{item.lastMessage}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderMessageGroups = () => {
    return (
      <FlatList
        data={messageGroups}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={item => item._id}
        renderItem={renderGroup}
      />
    );
  };

  if (!allowMessaging) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 26}}>Disabled</Text>
        <Text style={{fontSize: 14}}>
          You have chosen to disable chat in your account settings.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      {renderChatHeader()}
      {renderMessageGroups()}
    </View>
  );
};

export default Chat;
