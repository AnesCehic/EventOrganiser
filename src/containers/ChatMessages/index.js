import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {MessageInput, HeaderBack} from '@components';

import {MessagesService, MessageGroupsService} from '@services/apiClient';
import {Styles} from '@common';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

import ModalImage from './ModalImages';
import PushNotification from 'react-native-push-notification';

import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

const ChatMessages = ({navigation, route}) => {
  const [userId, setUserId] = useState(null);
  const colorScheme = useColorScheme();
  const [textMessage, setTextMessage] = useState('');
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    isVisible: false,
    image: null,
  });
  const [pagination, setPagination] = useState({
    total: 10,
    page: 1,
    limit: 20,
    messages: [],
  });

  const handleNewMessages = message => {
    if (message.groupId === route.params.groupId) {
      setPagination({
        ...pagination,
        messages: [message, ...pagination.messages],
      });
      setTextMessage('');
    }
  };

  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      headerTitleAlign: 'center',
      headerRight: () => {
        return route.params.component;
      },
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, []);

  const labelUpdate = res => {
    navigation.setOptions({
      title: res.label,
    });
  };

  useEffect(() => {
    MessagesService.on('created', handleNewMessages);
    MessageGroupsService.on('patched', labelUpdate);
    return () => {
      MessagesService.off('created', handleNewMessages);
      MessageGroupsService.off('patched', labelUpdate);
    };
  });

  const getMessages = async () => {
    try {
      if ((pagination.page - 1) * 20 > pagination.total) {
        return;
      }
      const userIdH = await AsyncStorageLib.getItem('@userId');
      setUserId(userIdH);

      const {data, ...res} = await MessagesService.find({
        query: {
          groupId: route.params.groupId,
          $sort: {
            createdAt: -1,
          },
          $skip: (pagination.page - 1) * 10,
          $limit: pagination.limit,
        },
      });

      setPagination({
        ...pagination,
        total: res.total,
        page: pagination.page + 1,
        messages: [...pagination.messages, ...data],
      });
    } catch (error) {
      console.log('[Error get messages]', error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const openFullScreen = url => {
    setModalVisible({
      isVisible: true,
      image: url,
    });
  };

  const renderDate = date => {
    dayjs.extend(isToday);
    dayjs.extend(isYesterday);
    let message = '';
    if (dayjs(date).isToday()) {
      message = 'Today';
    } else if (dayjs(date).isYesterday()) {
      message = 'Yesterday';
    } else {
      message = date;
    }
    return <Text style={styles.messageDate}>{message}</Text>;
  };

  const renderImageLink = (sender, position) => {
    let image = sender?.upload?.files[0].signedURL;

    if (!image) {
      return (
        <View
          style={[
            styles.senderImage,
            position,
            {
              backgroundColor: '#B7BFC7',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text
            style={{
              fontSize: 12,
            }}>{`${sender.firstName[0]}${sender.lastName[0]}`}</Text>
        </View>
      );
    }
    return (
      <Image source={{uri: image}} style={[styles.senderImage, position]} />
    );
  };

  const renderTriangle = (
    curr,
    next,
    nextDate,
    currDate,
    sender,
    shouldRender,
    position,
  ) => {
    if (shouldRender) {
      return null;
    }

    let image = renderImageLink(sender, position);

    if (!next) {
      return image;
    }
    if (next) {
      if (nextDate !== currDate) {
        return image;
      }

      if (nextDate === currDate) {
        if (next !== curr) {
          return image;
        }
      }
    }
  };

  const renderItem = ({item, index}) => {
    const previousMessage = pagination.messages[index + 1]?.createdAt;
    const nextMessage = pagination.messages[index - 1]?.ownerId;
    const nextMessageDate = pagination.messages[index - 1]?.createdAt;
    let currentMessage = item?.ownerId;
    let previousSender = pagination.messages[index + 1]?.ownerId;
    let previousDate =
      previousMessage && dayjs(previousMessage).format('MM/DD/YYYY');
    let nextMessageDateFormatted =
      nextMessageDate && dayjs(nextMessageDate).format('MM/DD/YYYY');
    let currentDate = dayjs(item?.createdAt).format('MM/DD/YYYY');

    const senderImageUrl = route.params.participants.find(
      e => e._id === item.ownerId,
    );

    return (
      <View
      // style={{
      //   flexDirection: 'row',
      //   justifyContent: 'flex-end',
      //   alignItems: 'flex-end',
      // }}
      >
        {!previousDate && renderDate(currentDate)}
        {previousDate && currentDate !== previousDate
          ? renderDate(currentDate)
          : null}
        {item.text ? (
          <View
            style={[
              styles.messageContainer,
              item.ownerId === userId
                ? styles.userMessageContainer
                : styles.friendMessageContainer,
              (previousDate !== currentDate ||
                previousSender !== currentMessage) && {
                borderTopRightRadius: 17,
                borderTopLeftRadius: 17,
              },
              (currentDate !== nextMessageDateFormatted ||
                currentMessage !== nextMessage) && {
                borderBottomRightRadius: 17,
                borderBottomLeftRadius: 17,
              },
            ]}>
            {item.text ? (
              <Text
                style={
                  item.ownerId === userId
                    ? styles.userMessageContainerText
                    : styles.friendMessageContainerText
                }>
                {item.text}
              </Text>
            ) : null}
            {/* <Text style={styles.messageDateTime}>
              {dayjs(item.createdAt).format('HH:mm')}
            </Text> */}
          </View>
        ) : null}
        {item.upload && (
          <View
            style={[
              styles.messageContainer,
              {
                padding: 0,
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden',
                maxWidth: 250,
              },
              item.ownerId === userId
                ? {
                    ...styles.userMessageContainer,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }
                : {
                    ...styles.friendMessageContainer,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  },
              {backgroundColor: Styles.Colors.white},
              (previousDate !== currentDate ||
                previousSender !== currentMessage) && {
                borderTopRightRadius: 17,
                borderTopLeftRadius: 17,
              },
              (currentDate !== nextMessageDateFormatted ||
                currentMessage !== nextMessage) && {
                borderBottomRightRadius: 17,
                borderBottomLeftRadius: 17,
              },
              colorScheme === 'dark' && {backgroundColor: '#273038'},
            ]}>
            {item.upload?.files.map((image, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => openFullScreen(image.signedURL)}>
                  <Image
                    style={[
                      {
                        alignSelf: 'flex-end',
                        margin: 1,
                        width: 100,
                        height: 70,
                        marginLeft: item?.ownerId !== userId ? 0 : 1,
                        marginRight: item?.ownerId !== userId ? 1 : 0,
                      },
                    ]}
                    source={{uri: image.signedURL}}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        {renderTriangle(
          currentMessage,
          nextMessage,
          nextMessageDateFormatted,
          currentDate,
          senderImageUrl,
          item.ownerId === userId,
          {left: 2},
        )}
        {/* <Icon name="checkmark-circle-outline" size={20} /> */}
      </View>
    );
  };

  const renderMesagesList = () => {
    return (
      <FlatList
        contentContainerStyle={[
          {alignItems: 'stretch'},
          colorScheme === 'dark' && {backgroundColor: '#273038'},
        ]}
        style={{marginBottom: 16}}
        data={pagination.messages}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        inverted
        onEndReached={() => {
          getMessages();
        }}
      />
    );
  };

  const textChange = text => {
    setTextMessage(text);
  };

  const sendMessage = async () => {
    try {
      const token = await AsyncStorageLib.getItem('feathers-jwt');
      let uploadId;

      if (images.length !== 0) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          formData.append(`file_${i}`, {
            name: image.fileName,
            type: image.type,
            uri: image.uri,
          });
        }
        const upload = await fetch('https://api.lincolnclub.app/uploads', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then(res => res.json());

        uploadId = upload._id;
        setImages([]);
      }

      const res = await MessagesService.create({
        groupId: route.params.groupId,
        text: textMessage,
        uploadId: uploadId,
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
        isDarkMode={colorScheme === 'dark'}
        onPress={sendMessage}
        images={images}
        setImages={setImages}
      />
    );
  };

  // TODO fix keyboard aware scroll view for iOS
  return (
    <SafeAreaView
      edges={['right', 'left', 'top']}
      style={[
        styles.container,
        {backgroundColor: '#141C24'},
        colorScheme === 'dark' && {backgroundColor: '#273038'},
      ]}>
      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          {flex: 1, backgroundColor: 'white'},
          colorScheme === 'dark' && {backgroundColor: '#141C24'},
        ]}>
        {renderMesagesList()}

        <View
          style={[
            {width: '100%', height: 1, backgroundColor: '#E6EBF0'},
            colorScheme === 'dark' && {backgroundColor: '#273038'},
          ]}
        />

        {renderMessageInput()}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChatMessages;
