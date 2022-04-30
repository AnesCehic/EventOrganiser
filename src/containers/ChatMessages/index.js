import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, Image, TouchableOpacity} from 'react-native';
import {MessageInput, HeaderBack} from '@components';

import {MessagesService} from '@services/apiClient';
import {Styles} from '@common';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

import ModalImage from './ModalImages';

const ChatMessages = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [textMessage, setTextMessage] = useState('');
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    isVisible: false,
    image: null,
  });
  const [pagination, setPagination] = useState({
    total: 10,
    page: 1,
    limit: 10,
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

  useEffect(() => {
    MessagesService.on('created', handleNewMessages);
    return () => {
      MessagesService.off('created', handleNewMessages);
    };
  });

  const getMessages = async () => {
    try {
      if ((pagination.page - 1) * 10 > pagination.total) {
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

  const renderItem = ({item}) => {
    return (
      <View
      // style={{
      //   flexDirection: 'row',
      //   justifyContent: 'flex-end',
      //   alignItems: 'flex-end',
      // }}
      >
        {item.text ? (
          <View
            style={[
              styles.messageContainer,
              item.ownerId === userId
                ? styles.userMessageContainer
                : styles.friendMessageContainer,
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
            <Text style={styles.messageDateTime}>
              {dayjs(item.createdAt).format('MM/DD HH:mm')}
            </Text>
          </View>
        ) : null}
        {item.upload && (
          <View
            style={[
              styles.messageContainer,
              {
                padding: 0,
                margin: 0,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                overflow: 'hidden',
                maxWidth: 250,
              },
              item.ownerId === userId
                ? styles.userMessageContainer
                : styles.friendMessageContainer,
              {backgroundColor: Styles.Colors.white, borderRadius: 8},
            ]}>
            {item.upload?.files.map((image, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => openFullScreen(image.signedURL)}>
                  <Image
                    style={{
                      alignSelf: 'flex-end',
                      borderRadius: 8,
                      margin: 1,
                      width: 100,
                      height: 70,
                    }}
                    source={{uri: image.signedURL}}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        {/* <Icon name="checkmark-circle-outline" size={20} /> */}
      </View>
    );
  };

  const renderMesagesList = () => {
    return (
      <FlatList
        contentContainerStyle={{alignItems: 'stretch'}}
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

      console.log(res);

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
        images={images}
        setImages={setImages}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderMesagesList()}
      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={{width: '100%', height: 1, backgroundColor: '#E6EBF0'}} />
      {renderMessageInput()}
    </View>
  );
};

export default ChatMessages;
