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

import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/EvilIcons';
import IonCons from 'react-native-vector-icons/Ionicons';

import {MenuItem, SubmitButton, LoadingIndicator} from '@components';
import {UserContext} from '@contexts';
import {MessageGroupsService} from '@services/apiClient';
import {Styles} from '@common';

import data from './data';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {Avatar, SearchBar} from 'react-native-elements';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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
            <IonCons name="grid" size={25} style={styles.eventsHeaderIcon} />
            <Text style={styles.title}>Chat</Text>
          </View>
          <TouchableOpacity
            style={styles.createMessageIcon}
            onPress={() => {
              navigation.navigate('CreateChat');
            }}>
            <IonCons
              name={'create-outline'}
              size={20}
              style={{color: Styles.Colors.white}}
            />
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
      const res = await MessageGroupsService.remove(id);
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
            width: 70,
            height: '100%',
          }}>
          <Animated.Text
            style={[
              {
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textAlignVertical: 'center',
              },
            ]}>
            <IonCons
              name="ios-trash-sharp"
              size={25}
              color={Styles.Colors.white}
            />
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderGroup = ({item}) => {
    let image;
    let component = null;
    let componentHeader = null;
    if (item.type === 0) {
      image = item.participantList.find(e => e._id !== userData._id);
      if (image.upload?.files[0]?.signedURL) {
        image = image.upload?.files[0]?.signedURL;
        component = (
          <Avatar
            size={Styles.Sizes.avatarMedium}
            rounded
            source={{
              uri: image.upload?.files[0]?.signedURL,
            }}
          />
        );
        componentHeader = (
          <Avatar
            size={Styles.Sizes.avatarSmall}
            rounded
            source={{
              uri: image.upload?.files[0]?.signedURL,
            }}
          />
        );
      } else {
        let name = image.firstName[0] + image.lastName[0];
        component = <Text style={styles.userImageFallback}>{name}</Text>;
        componentHeader = (
          <Text
            style={[
              styles.userImageFallback,
              {width: 32, height: 32, fontSize: 15},
            ]}>
            {name}
          </Text>
        );
      }
    } else {
      component = <Text>Groups</Text>;
    }

    return (
      <Swipeable
        friction={2}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item._id)
        }>
        <TouchableOpacity
          onPress={() =>
            navigateToMessages(item._id, item.label, componentHeader)
          }
          style={styles.messageContainer}>
          {component}
          <View style={styles.infoContainer}>
            <View style={styles.nameAndTime}>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <View>
              <Text>{item.lastMessage}</Text>
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
