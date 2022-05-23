import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Animated,
  useColorScheme,
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

import Icon from 'react-native-vector-icons/AntDesign';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MainIcon from '../../components/ChatMessageIcon/MainIcon';

const Chat = ({navigation}) => {
  const colorScheme = useColorScheme();
  const {allowMessaging, userData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messageGroups, setMessageGroups] = useState([]);
  const [search, setSearch] = useState('');

  const navigateToMessages = (groupId, label, component, participants) => {
    navigation.navigate('Message', {
      groupId,
      label,
      component,
      participants,
    });
  };

  const renderChatHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.title}>
              <GridIcon color={colorScheme === 'dark' ? '#b5b5b5' : null} />
              <Text> </Text>
              Chat
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.createMessageIcon,
              colorScheme === 'dark' && {backgroundColor: '#4C5761'},
            ]}
            onPress={() => {
              navigation.navigate('CreateChat');
            }}>
            <View>
              <NewMessageIcon
                color={colorScheme === 'dark' ? '#b5b5b5' : Styles.Colors.white}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: colorScheme === 'dark' ? '#0A121A' : Styles.Colors.white,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderRadius: 6,
          }}>
          <Icon
            name="search1"
            size={25}
            style={[
              {padding: 5, paddingLeft: 10},
              colorScheme === 'dark' && {color: Styles.Colors.white},
            ]}
          />
          <TextInput
            value={search}
            style={[
              {paddingRight: 10, flex: 1},
              colorScheme === 'dark' && {color: Styles.Colors.white},
            ]}
            placeholderTextColor={colorScheme === 'dark' && Styles.Colors.white}
            onChangeText={text => {
              setSearch(text);
              searchChats();
            }}
            placeholder="Search conversations or people"
          />
        </View>
      </View>
    );
  };

  const searchChats = async () => {
    try {
      const res = await MessageGroupsService.find({
        query: {
          label: search,
        },
      });
      console.log('search results', res);
    } catch (error) {
      console.log('[Error seraching chat groups]', error);
    }
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
                color: Styles.Colors.white,
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
        containerStyle={colorScheme === 'dark' && {backgroundColor: '#0A121A'}}
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
              item.participantList,
            )
          }
          style={[
            styles.messageContainer,
            colorScheme === 'dark' && {backgroundColor: '#0A121A'},
          ]}>
          {component}
          <View style={styles.infoContainer}>
            <View style={styles.nameAndTime}>
              <Text
                style={[
                  styles.label,
                  colorScheme === 'dark' && {color: Styles.Colors.white},
                ]}>
                {item.label}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  {fontSize: 14},
                  colorScheme === 'dark' && {color: Styles.Colors.white},
                ]}>
                {item.lastMessage}
              </Text>
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
    <View
      style={[
        styles.container,
        colorScheme === 'dark' && {backgroundColor: '#0A121A'},
      ]}>
      {renderChatHeader()}
      {renderMessageGroups()}
    </View>
  );
};

export default Chat;
